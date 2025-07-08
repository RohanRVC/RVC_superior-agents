from flask import Flask, request, jsonify, send_file
import os
import json
import uuid
import subprocess
import threading
import time
from datetime import datetime
import shutil
import zipfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration
LOGGER_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logger")
os.makedirs(LOGGER_DIR, exist_ok=True)

# Store active builds and their logs
active_builds = {}

def run_autofounder(idea, model, mode, api_key=None):
    """
    Run the AutoFounder process in a separate thread
    """
    # Generate a unique project ID
    project_id = str(uuid.uuid4())
    
    # Create environment variables dict
    env = os.environ.copy()
    
    # Set API key if provided
    if api_key and model != 'openrouter':
        if model == 'openai':
            env['OPENAI_API_KEY'] = api_key
        elif model == 'claude':
            env['ANTHROPIC_API_KEY'] = api_key
    
    # Initialize logs
    active_builds[project_id] = {
        'logs': [
            '🚀 Welcome to AutoFounder OS 💪🏻🤖💖',
            f'💡 Processing idea: "{idea}"',
            f'🤖 Model selected: {model}',
            f'🧠 Starting AutoBuilder Agent in {mode} mode...'
        ],
        'status': 'running',
        'start_time': datetime.now().isoformat(),
        'idea': idea,
        'model': model,
        'mode': mode
    }
    
    def run_process():
        try:
            # Construct the command to run main.py
            cmd = ['python', 'main.py']
            
            # Create a process to run the command
            process = subprocess.Popen(
                cmd,
                env=env,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            
            # Read output line by line
            for line in iter(process.stdout.readline, ''):
                # Add the line to the logs
                active_builds[project_id]['logs'].append(line.strip())
                
                # Check if the process is done
                if 'Build complete' in line or 'Project build complete' in line:
                    active_builds[project_id]['status'] = 'completed'
                    
                    # Try to determine the project folder name from logs
                    project_folder = None
                    for log in active_builds[project_id]['logs']:
                        if 'logger/' in log and '/code/' in log:
                            parts = log.split('logger/')
                            if len(parts) > 1:
                                project_folder = parts[1].split('/')[0]
                                break
                    
                    if project_folder:
                        active_builds[project_id]['project_folder'] = project_folder
            
            # Process completed
            process.stdout.close()
            return_code = process.wait()
            
            if return_code != 0 and active_builds[project_id]['status'] != 'completed':
                active_builds[project_id]['status'] = 'failed'
                active_builds[project_id]['logs'].append(f'❌ Process exited with code {return_code}')
        
        except Exception as e:
            active_builds[project_id]['status'] = 'failed'
            active_builds[project_id]['logs'].append(f'❌ Error: {str(e)}')
    
    # Start the process in a separate thread
    thread = threading.Thread(target=run_process)
    thread.daemon = True
    thread.start()
    
    return project_id

@app.route('/api/build', methods=['POST'])
def build_project():
    """
    Start a new build process
    """
    data = request.json
    
    # Validate required fields
    if not data.get('idea'):
        return jsonify({'error': 'Idea is required'}), 400
    
    # Get parameters
    idea = data.get('idea')
    model = data.get('model', 'openrouter')
    mode = data.get('mode', 'demo')
    api_key = data.get('apiKey')
    
    # Start the build process
    project_id = run_autofounder(idea, model, mode, api_key)
    
    return jsonify({
        'projectId': project_id,
        'status': 'success',
        'message': 'Build started successfully'
    })

@app.route('/api/projects/<project_id>/logs', methods=['GET'])
def get_logs(project_id):
    """
    Get logs for a specific project
    """
    if project_id not in active_builds:
        return jsonify({'error': 'Project not found'}), 404
    
    return jsonify(active_builds[project_id]['logs'])

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """
    Get project details
    """
    if project_id not in active_builds:
        return jsonify({'error': 'Project not found'}), 404
    
    build_info = active_builds[project_id]
    
    # Get project folder name if available
    project_folder = build_info.get('project_folder')
    
    # If we don't have a project folder yet, try to determine it from the logs
    if not project_folder:
        for log in build_info['logs']:
            if 'logger/' in log and '/code/' in log:
                parts = log.split('logger/')
                if len(parts) > 1:
                    project_folder = parts[1].split('/')[0]
                    build_info['project_folder'] = project_folder
                    break
    
    # Count files if we have a project folder
    file_count = 0
    if project_folder:
        project_path = os.path.join(LOGGER_DIR, project_folder, 'code')
        if os.path.exists(project_path):
            for root, dirs, files in os.walk(project_path):
                file_count += len(files)
    
    return jsonify({
        'id': project_id,
        'name': build_info.get('idea', '').split(' ')[:3],  # Use first 3 words of idea as name
        'description': build_info.get('idea'),
        'status': build_info.get('status'),
        'model': build_info.get('model'),
        'mode': build_info.get('mode'),
        'fileCount': file_count,
        'createdAt': build_info.get('start_time'),
        'projectFolder': project_folder
    })

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """
    Get all projects
    """
    projects = []
    
    # First add active builds
    for project_id, build_info in active_builds.items():
        project_folder = build_info.get('project_folder')
        
        # Count files if we have a project folder
        file_count = 0
        if project_folder:
            project_path = os.path.join(LOGGER_DIR, project_folder, 'code')
            if os.path.exists(project_path):
                for root, dirs, files in os.walk(project_path):
                    file_count += len(files)
        
        projects.append({
            'id': project_id,
            'name': ' '.join(build_info.get('idea', '').split(' ')[:3]),  # Use first 3 words of idea as name
            'description': build_info.get('idea'),
            'status': build_info.get('status'),
            'fileCount': file_count,
            'createdAt': build_info.get('start_time')
        })
    
    # Then add projects from logger directory that aren't in active_builds
    if os.path.exists(LOGGER_DIR):
        for folder in os.listdir(LOGGER_DIR):
            folder_path = os.path.join(LOGGER_DIR, folder)
            if os.path.isdir(folder_path) and not any(build_info.get('project_folder') == folder for build_info in active_builds.values()):
                # Try to read project info from system.log
                description = folder.replace('_', ' ')
                created_at = datetime.now().isoformat()
                
                log_file = os.path.join(folder_path, 'system.log')
                if os.path.exists(log_file):
                    with open(log_file, 'r') as f:
                        for line in f:
                            if 'Processing idea:' in line:
                                description = line.split('Processing idea:')[1].strip().strip('"')
                                break
                
                # Count files
                file_count = 0
                code_path = os.path.join(folder_path, 'code')
                if os.path.exists(code_path):
                    for root, dirs, files in os.walk(code_path):
                        file_count += len(files)
                
                projects.append({
                    'id': f'local-{folder}',
                    'name': ' '.join(description.split(' ')[:3]),
                    'description': description,
                    'status': 'completed',
                    'fileCount': file_count,
                    'createdAt': created_at,
                    'projectFolder': folder
                })
    
    return jsonify(projects)

@app.route('/api/projects/<project_id>/files', methods=['GET'])
def get_project_files(project_id):
    """
    Get files for a specific project
    """
    # Get project folder
    project_folder = None
    
    if project_id in active_builds:
        project_folder = active_builds[project_id].get('project_folder')
    elif project_id.startswith('local-'):
        project_folder = project_id[6:]  # Remove 'local-' prefix
    
    if not project_folder:
        return jsonify({'error': 'Project folder not found'}), 404
    
    project_path = os.path.join(LOGGER_DIR, project_folder, 'code')
    if not os.path.exists(project_path):
        return jsonify({'error': 'Project files not found'}), 404
    
    # Build file tree
    files = []
    for root, dirs, filenames in os.walk(project_path):
        rel_path = os.path.relpath(root, project_path)
        if rel_path == '.':
            rel_path = ''
        
        # Add directories
        for dir_name in dirs:
            dir_path = os.path.join(rel_path, dir_name) if rel_path else dir_name
            files.append({
                'name': dir_name,
                'path': dir_path,
                'type': 'directory'
            })
        
        # Add files
        for filename in filenames:
            file_path = os.path.join(rel_path, filename) if rel_path else filename
            files.append({
                'name': filename,
                'path': file_path,
                'type': 'file'
            })
    
    # Also check for README.md in the project root
    readme_path = os.path.join(LOGGER_DIR, project_folder, 'README.md')
    if os.path.exists(readme_path):
        files.append({
            'name': 'README.md',
            'path': 'README.md',
            'type': 'file'
        })
    
    return jsonify(files)

@app.route('/api/projects/<project_id>/files/<path:file_path>', methods=['GET'])
def get_file_content(project_id, file_path):
    """
    Get content of a specific file
    """
    # Get project folder
    project_folder = None
    
    if project_id in active_builds:
        project_folder = active_builds[project_id].get('project_folder')
    elif project_id.startswith('local-'):
        project_folder = project_id[6:]  # Remove 'local-' prefix
    
    if not project_folder:
        return jsonify({'error': 'Project folder not found'}), 404
    
    # Check if it's README.md in the project root
    if file_path == 'README.md':
        file_full_path = os.path.join(LOGGER_DIR, project_folder, 'README.md')
    else:
        file_full_path = os.path.join(LOGGER_DIR, project_folder, 'code', file_path)
    
    if not os.path.exists(file_full_path) or not os.path.isfile(file_full_path):
        return jsonify({'error': 'File not found'}), 404
    
    # Read file content
    with open(file_full_path, 'r') as f:
        content = f.read()
    
    # Determine language based on file extension
    extension = os.path.splitext(file_path)[1].lower()
    language_map = {
        '.py': 'python',
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.ts': 'typescript',
        '.tsx': 'tsx',
        '.html': 'html',
        '.css': 'css',
        '.json': 'json',
        '.md': 'markdown',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.sh': 'bash',
        '.sql': 'sql'
    }
    language = language_map.get(extension, 'text')
    
    return jsonify({
        'content': content,
        'language': language
    })

@app.route('/api/projects/<project_id>/download', methods=['GET'])
def download_project(project_id):
    """
    Download project as a zip file
    """
    # Get project folder
    project_folder = None
    
    if project_id in active_builds:
        project_folder = active_builds[project_id].get('project_folder')
    elif project_id.startswith('local-'):
        project_folder = project_id[6:]  # Remove 'local-' prefix
    
    if not project_folder:
        return jsonify({'error': 'Project folder not found'}), 404
    
    project_path = os.path.join(LOGGER_DIR, project_folder)
    if not os.path.exists(project_path):
        return jsonify({'error': 'Project not found'}), 404
    
    # Create a temporary zip file
    zip_path = os.path.join('/tmp', f'{project_folder}.zip')
    
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        # Add code directory
        code_path = os.path.join(project_path, 'code')
        if os.path.exists(code_path):
            for root, dirs, files in os.walk(code_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, project_path)
                    zipf.write(file_path, arcname)
        
        # Add README.md if it exists
        readme_path = os.path.join(project_path, 'README.md')
        if os.path.exists(readme_path):
            zipf.write(readme_path, 'README.md')
    
    return send_file(
        zip_path,
        mimetype='application/zip',
        as_attachment=True,
        download_name=f'{project_folder}.zip'
    )

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)