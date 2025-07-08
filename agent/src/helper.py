# src/helper.py

import re
import string
import random, os
import time, json
from datetime import datetime
from contextlib import contextmanager

# ------------------------------
# 📁 Project & File Utilities
# ------------------------------
def extract_json_block(text: str) -> str:
    """
    Extracts the first code block from triple backtick (```) markdown formatting,
    regardless of language (e.g., ```json, ```python, ```html).
    """
    import re
    match = re.search(r"```(?:[\w\-]*)\n(.*?)```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    raise ValueError("❌ No valid ```...``` code block found")


# def extract_json_block(text: str) -> str:
#     # Match triple-backtick python blocks
#     match = re.search(r"```python\s*(\{.*?\})\s*```", text, re.DOTALL)
#     if match:
#         return match.group(1)
#     else:
#         raise ValueError("No valid ```python``` block found.")

def slugify(text: str, max_len: int = 40) -> str:
    """
    Converts any idea or sentence into a safe folder name.

    Example:
        "Build a crypto portfolio" -> "build_a_crypto_portfolio"
    """
    text = text.lower()
    text = text.replace(" ", "_").replace("-", "_")
    return re.sub(r"[^a-z0-9_]", "", text)[:max_len]

def safe_filename(name: str) -> str:
    """
    Cleans each part of a nested path while preserving folder structure.
    Example: 'static/js/app.js' stays as 'static/js/app.js'
    """
    parts = name.split("/")
    safe_parts = [re.sub(r"[^\w\-.]", "_", part) for part in parts]
    return os.path.join(*safe_parts)


def nanoid(size=12) -> str:
    """
    Generate a small random ID string.

    Returns:
        str: Random ID with letters + digits.
    """
    chars = string.ascii_letters + string.digits
    return "".join(random.choice(chars) for _ in range(size))

def timestamp_now() -> str:
    """
    Get current datetime string in format YYYY-MM-DD HH:MM:SS
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# ------------------------------
# 🧠 Prompt/LLM Helpers
# ------------------------------

def extract_content(text: str, tag: str) -> str:
    """
    Extract content from a custom XML-like tag.
    
    Example:
        <code>print("hello")</code> → returns 'print("hello")'
    """
    if tag == "":
        return text

    pattern = rf"<{tag}>\s*(.*?)\s*</{tag}>"
    match = re.search(pattern, text, re.DOTALL)

    return match.group(1).strip() if match else ""

# ------------------------------
# 🎯 Log Helpers
# ------------------------------

def log_info(msg: str):
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[INFO {timestamp}] {msg}")

def log_warn(msg: str):
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[WARN {timestamp}] {msg}")

def log_error(msg: str):
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[ERROR {timestamp}] {msg}")

# ------------------------------
# 🧼 Content Cleaners
# ------------------------------

def strip_markdown(text: str) -> str:
    """
    Removes basic markdown symbols like **bold**, *italics*, etc.
    """
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)
    text = re.sub(r"`{1,3}(.*?)`{1,3}", r"\1", text)
    text = re.sub(r"\[.*?\]\((.*?)\)", r"\1", text)
    return text

def strip_html_tags(text: str) -> str:
    """
    Removes all HTML tags from string.
    """
    return re.sub(r"<.*?>", "", text)

# ------------------------------
# ⏱️ Timing Tool
# ------------------------------

@contextmanager
def track_time(label: str = "Block"):
    """
    Context manager to measure time taken by a code block.
    
    Usage:
        with track_time("Step 1"):
            some_code()
    """
    start = time.time()
    yield
    end = time.time()
    print(f"⏱️ {label} took {end - start:.2f}s")

# def clean_llm_code_blob(raw_response: str, target_filename: str) -> str:
#     """
#     Extracts the code content from the LLM response based on the file extension.
#     Supports HTML, CSS, JS, Python, and general plaintext.
#     """
#     print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
#     print('raw_response_in_clean_llm_code_blob-:',raw_response)
#     try:
#         # Basic extraction for JSON with file block
#         code_block = extract_json_block(raw_response)
#         parsed = json.loads(code_block)

#         code = parsed["files"].get(target_filename, "")

#         # If it's a string with escape chars, decode safely
#         if isinstance(code, str):
#             if target_filename.endswith((".py", ".js", ".css", ".html", ".json", ".txt")):
#                 try:
#                     return bytes(code, "utf-8").decode("unicode_escape")
#                 except Exception:
#                     return code  # fallback to raw
#         return str(code)

#     except Exception as e:
#         print(f"⚠️ Failed to clean code blob for {target_filename}: {e}")
#         return ""

######## working best 1
# def clean_llm_code_blob(raw_response: str, target_filename: str) -> str:
#     """
#     Extracts the code content from the LLM response based on the file extension.
#     Supports HTML, CSS, JS, Python, and general plaintext. Works for nested folders too.
#     """
#     try:
#         # Try to extract any code block, not just python
#         match = re.search(r"```[\w+-]*\n(.*?)```", raw_response, re.DOTALL)
#         block = match.group(1).strip() if match else raw_response.strip()

#         # Now try to load as JSON
#         parsed = json.loads(block)

#         code = parsed["files"].get(target_filename, "")
#         if isinstance(code, str):
#             try:
#                 return bytes(code, "utf-8").decode("unicode_escape")
#             except Exception:
#                 return code
#         return str(code)

#     except Exception as e:
#         print(f"⚠️ Failed to clean code blob for {target_filename}: {e}")
#         return ""

# def clean_llm_code_blob(raw_response: str, target_filename: str) -> str:
#     """
#     Extracts a single file's content from a JSON code blob returned by an LLM.
#     Decodes unicode-escaped strings like \\n, \\t properly.
#     """
#     try:
#         block = extract_json_block(raw_response)  # Uses the function above
#         parsed = json.loads(block)

#         # Get the specific file
#         code = parsed.get("files", {}).get(target_filename, "")

#         if not isinstance(code, str):
#             return str(code)

#         # Safely decode unicode escaped content
#         try:
#             return bytes(code, "utf-8").decode("unicode_escape")
#         except Exception:
#             return code  # Fallback to raw

#     except Exception as e:
#         print(f"⚠️ Failed to clean code blob for {target_filename}: {e}")
#         return ""

def clean_llm_code_blob(raw_response: str, target_filename: str) -> str:
    """
    Extracts the code content from the LLM response based on the file extension.
    Supports HTML, CSS, JS, Python, Markdown, and handles escaped/unescaped content safely.
    """
    try:
        # Try to extract code block from any triple backtick block
        match = re.search(r"```[\w+-]*\n(.*?)```", raw_response, re.DOTALL)
        block = match.group(1).strip() if match else raw_response.strip()

        # If it's JSON (like step 0), parse it
        if block.lstrip().startswith("{") and "files" in block:
            parsed = json.loads(block)
            code = parsed["files"].get(target_filename, "")
        else:
            # fallback: try to extract from raw_response directly
            parsed = json.loads(extract_json_block(raw_response))
            code = parsed["files"].get(target_filename, "")

        if isinstance(code, str):
            try:
                return bytes(code, "utf-8").decode("unicode_escape")
            except Exception:
                return code
        return str(code)

    except Exception as e:
        print(f"⚠️ Failed to clean code blob for {target_filename}: {e}")
        return ""
