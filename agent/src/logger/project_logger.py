# src/logger/project_logger.py

import os
import logging
from datetime import datetime

_loggers = {}

def get_project_logger(project_name: str) -> logging.Logger:
    """
    Get a logger that logs to logs/{project_name}/system.log
    """
    if project_name in _loggers:
        return _loggers[project_name]

    # Create folder if needed
    log_dir = os.path.join("logs", project_name)
    os.makedirs(log_dir, exist_ok=True)

    log_path = os.path.join(log_dir, "system.log")

    logger = logging.getLogger(f"autofounder.{project_name}")
    logger.setLevel(logging.DEBUG)

    # Avoid adding handlers multiple times
    if not logger.hasHandlers():
        # File handler with UTF-8 support ✅
        fh = logging.FileHandler(log_path, encoding="utf-8")
        fh.setLevel(logging.DEBUG)

        # Console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)

        # Formatter (no emoji problem anymore)
        formatter = logging.Formatter('[%(levelname)s %(asctime)s] %(message)s', datefmt='%H:%M:%S')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)

        logger.addHandler(fh)
        logger.addHandler(ch)

    _loggers[project_name] = logger
    return logger


# Utility functions
def log_info(project_name: str, msg: str):
    get_project_logger(project_name).info(msg)

def log_warn(project_name: str, msg: str):
    get_project_logger(project_name).warning(msg)

def log_error(project_name: str, msg: str):
    get_project_logger(project_name).error(msg)
