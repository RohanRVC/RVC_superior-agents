# # src/logger/project_writer.py

# import os
# from typing import Dict

# from agent.src.helper import timestamp_now, safe_filename


# def save_generated_files(project_name: str, files: Dict[str, str]):
#     """
#     Save all generated code files to the logger directory.

#     Args:
#         project_name (str): The folder where files will be saved (slugified idea name).
#         files (Dict[str, str]): A dictionary of filename -> file content.
#     """
#     folder = f"logger/{project_name}/code"
#     os.makedirs(folder, exist_ok=True)

#     for filename, content in files.items():
#         clean_name = safe_filename(filename)
#         filepath = os.path.join(folder, clean_name)

#         try:
#             with open(filepath, "w", encoding="utf-8") as f:
#                 f.write(content)
#             print(f"📄 Saved: {filepath}")
#         except Exception as e:
#             print(f"❌ Failed to save {filepath}: {e}")


# def log_info(project_name: str, message: str):
#     """
#     Appends a log message to a project-specific log file.

#     Args:
#         project_name (str): The folder where logs are saved.
#         message (str): The message to log.
#     """
#     folder = f"logger/{project_name}"
#     os.makedirs(folder, exist_ok=True)

#     logfile = os.path.join(folder, "system.log")

#     with open(logfile, "a", encoding="utf-8") as f:
#         f.write(f"[{timestamp_now()}] {message}\n")

# src/logger/project_writer.py

import os
import json
from typing import Dict, List

from agent.src.helper import timestamp_now, safe_filename

def save_generated_files(project_name: str, files: Dict[str, str]):
    """
    Save all generated code files to logger/{project_name}/code/
    and update logger/{project_name}/.filemap.json with paths.

    Supports nested folders like static/js or templates/.
    """
    root_code_dir = f"logger/{project_name}/code"
    os.makedirs(root_code_dir, exist_ok=True)

    filemap_path = os.path.join(f"logger/{project_name}", ".filemap.json")

    # Load existing filemap if it exists
    if os.path.exists(filemap_path):
        try:
            with open(filemap_path, "r", encoding="utf-8") as f:
                saved_files = json.load(f)
        except Exception:
            saved_files = []
    else:
        saved_files = []

    # Save each file and add to file map
    for filename, content in files.items():
        cleaned_path = safe_filename(filename)
        full_path = os.path.join(root_code_dir, cleaned_path)

        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        try:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"📄 Saved: {full_path}")
            saved_files.append(f"code/{cleaned_path}")
        except Exception as e:
            print(f"❌ Failed to save {full_path}: {e}")

    # ✅ Write updated file map
    try:
        with open(filemap_path, "w", encoding="utf-8") as f:
            json.dump(saved_files, f, indent=2)
        print(f"🗂️  File map updated: {filemap_path}")
    except Exception as e:
        print(f"❌ Failed to update .filemap.json: {e}")


def log_info(project_name: str, message: str):
    """
    Appends a log message to logger/{project_name}/system.log

    Args:
        project_name (str): Project folder
        message (str): Log message
    """
    folder = f"logger/{project_name}"
    os.makedirs(folder, exist_ok=True)

    logfile = os.path.join(folder, "system.log")

    with open(logfile, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp_now()}] {message}\n")
