# src/logger/copilot_tracker.py

import os
import json
from agent.src.helper import timestamp_now, safe_filename


def track_step(project_name: str, step: int, data: dict):
    """
    Save each step's result (summary, files, status) into a JSON file.

    Args:
        project_name (str): Folder name (slugified project name)
        step (int): Step number
        data (dict): Response from LLM
    """
    log_folder = f"logger/{project_name}/steps"
    os.makedirs(log_folder, exist_ok=True)

    filename = safe_filename(f"step_{step}.json")
    filepath = os.path.join(log_folder, filename)

    payload = {
        "step": step,
        "timestamp": timestamp_now(),
        "summary": data.get("summary", ""),
        "status": data.get("status", "in_progress"),
        "files": list(data.get("files", {}).keys())  # just file names
    }

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    print(f"📝 Copilot log saved: {filepath}")
