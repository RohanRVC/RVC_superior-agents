# src/logger/system_logger.py

import os
import logging
from datetime import datetime

# Create log folder if not exists
os.makedirs("logs", exist_ok=True)

# Set log file path
log_file = os.path.join("logs", "system.log")

# Setup logger
logger = logging.getLogger("autofounder")
logger.setLevel(logging.DEBUG)

# File handler
file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.DEBUG)

# Console handler (optional)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Formatter for timestamps
formatter = logging.Formatter('[%(levelname)s %(asctime)s] %(message)s', datefmt='%H:%M:%S')

file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

# Avoid adding duplicate handlers
if not logger.hasHandlers():
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

# Shortcut functions
def log_info(msg: str):
    logger.info(msg)

def log_warn(msg: str):
    logger.warning(msg)

def log_error(msg: str):
    logger.error(msg)
