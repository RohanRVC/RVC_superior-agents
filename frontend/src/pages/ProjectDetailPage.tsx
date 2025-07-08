import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiArrowLeft, FiPlay } from 'react-icons/fi';
import FileTree from '../components/FileTree';
import CodePreview from '../components/CodePreview';

// Mock file structure
const mockFileStructure = [
  {
    name: 'main.py',
    path: 'main.py',
    type: 'file',
  },
  {
    name: 'routes.py',
    path: 'routes.py',
    type: 'file',
  },
  {
    name: 'templates',
    path: 'templates',
    type: 'directory',
    children: [
      {
        name: 'index.html',
        path: 'templates/index.html',
        type: 'file',
      },
      {
        name: 'about.html',
        path: 'templates/about.html',
        type: 'file',
      },
    ],
  },
  {
    name: 'static',
    path: 'static',
    type: 'directory',
    children: [
      {
        name: 'css',
        path: 'static/css',
        type: 'directory',
        children: [
          {
            name: 'styles.css',
            path: 'static/css/styles.css',
            type: 'file',
          },
        ],
      },
      {
        name: 'js',
        path: 'static/js',
        type: 'directory',
        children: [
          {
            name: 'app.js',
            path: 'static/js/app.js',
            type: 'file',
          },
        ],
      },
    ],
  },
  {
    name: 'README.md',
    path: 'README.md',
    type: 'file',
  },
];

// Mock file contents
const mockFileContents: Record<string, { content: string; language: string }> = {
  'main.py': {
    content: `from flask import Flask, render_template
from routes import register_routes

app = Flask(__name__)
register_routes(app)

@app.route('/')
def index():
    return render_template('index.html', title="My Portfolio")

if __name__ == '__main__':
    app.run(debug=True)`,
    language: 'python',
  },
  'routes.py': {
    content: `from flask import render_template

def register_routes(app):
    @app.route('/about')
    def about():
        return render_template('about.html', title="About Me")
        
    @app.route('/projects')
    def projects():
        projects = [
            {"name": "Project 1", "description": "Description of project 1"},
            {"name": "Project 2", "description": "Description of project 2"},
            {"name": "Project 3", "description": "Description of project 3"}
        ]
        return render_template('projects.html', title="My Projects", projects=projects)`,
    language: 'python',
  },
  'templates/index.html': {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/" class="active">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/projects">Projects</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="hero">
            <h1>Welcome to My Portfolio</h1>
            <p>I'm a web developer specializing in Flask and modern frontend technologies.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 My Portfolio</p>
    </footer>
    <script src="{{ url_for('static', filename='js/app.js') }}"></script>
</body>
</html>`,
    language: 'html',
  },
  'static/css/styles.css': {
    content: `/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
}

nav ul li {
    margin: 0 1rem;
}

nav ul li a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;
}

nav ul li a.active,
nav ul li a:hover {
    border-bottom: 2px solid white;
}

.hero {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #f8f9fa;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

footer {
    text-align: center;
    padding: 1rem;
    background-color: #2c3e50;
    color: white;
}`,
    language: 'css',
  },
  'README.md': {
    content: `# Portfolio Website

A personal portfolio website built with Flask, HTML, CSS, and JavaScript.

## Features

- Responsive design
- About page
- Projects showcase
- Contact form

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`
3. Run the application:
   \`\`\`
   python main.py
   \`\`\`

## Project Structure

- \`main.py\`: Flask application entry point
- \`routes.py\`: Route definitions
- \`templates/\`: HTML templates
- \`static/\`: Static assets (CSS, JS)

## License

MIT`,
    language: 'markdown',
  },
};

// Mock project data
const mockProjects: Record<string, { name: string; description: string; createdAt: string }> = {
  'portfolio-website': {
    name: 'Portfolio Website',
    description: 'A personal portfolio website with Flask backend and responsive HTML/CSS frontend',
    createdAt: '2025-07-05T14:30:00Z',
  },
  'todo-app': {
    name: 'Todo App',
    description: 'A simple todo application with React frontend and Express backend',
    createdAt: '2025-07-03T10:15:00Z',
  },
  'weather-dashboard': {
    name: 'Weather Dashboard',
    description: 'A weather dashboard that fetches data from OpenWeatherMap API',
    createdAt: '2025-07-01T16:45:00Z',
  },
};

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<{ name: string; description: string; createdAt: string } | null>(null);

  useEffect(() => {
    // Simulate API call to fetch project details
    const fetchProject = async () => {
      setIsLoading(true);
      
      // In a real implementation, fetch from backend
      // For now, use mock data with a delay
      setTimeout(() => {
        if (projectId && mockProjects[projectId]) {
          setProject(mockProjects[projectId]);
          // Set default selected file to README.md or first file
          setSelectedFile('README.md');
        }
        setIsLoading(false);
      }, 1000);
    };
    
    fetchProject();
  }, [projectId]);

  const handleFileClick = (path: string) => {
    setSelectedFile(path);
  };

  const handleDownload = () => {
    // In a real implementation, this would trigger a download of the project files
    alert('Download functionality would be implemented here');
  };

  const handleRerun = () => {
    // In a real implementation, this would trigger a re-run of the project
    alert('Re-run functionality would be implemented here');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Link
                    to="/projects"
                    className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <FiArrowLeft className="h-5 w-5" />
                  </Link>
                  <h1 className="text-3xl font-bold">{project.name}</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
              <div className="flex mt-4 md:mt-0 space-x-4">
                <button
                  onClick={handleRerun}
                  className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors duration-200"
                >
                  <FiPlay className="mr-2" />
                  Re-run
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
                >
                  <FiDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* File Tree */}
            <div className="lg:col-span-1">
              <FileTree 
                files={mockFileStructure} 
                onFileClick={handleFileClick}
                selectedFile={selectedFile || undefined}
              />
            </div>
            
            {/* File Content */}
            <div className="lg:col-span-3">
              {selectedFile && mockFileContents[selectedFile] ? (
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">{selectedFile}</h2>
                    <a
                      href={`#view-raw-${selectedFile}`}
                      className="text-sm text-primary-600 dark:text-primary-400 flex items-center"
                    >
                      <FiExternalLink className="mr-1" />
                      View Raw
                    </a>
                  </div>
                  <CodePreview
                    code={mockFileContents[selectedFile].content}
                    language={mockFileContents[selectedFile].language}
                    fileName={selectedFile}
                  />
                </div>
              ) : (
                <div className="glass-card p-6 flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a file from the tree to view its contents
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;