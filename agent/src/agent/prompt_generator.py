# prompt_generator.py – Generates prompts for each agent step

"""
prompt_generator.py – Creates prompts for each agent step

This module defines the `PromptGenerator` class which builds custom GPT prompts
based on the startup idea and the current step in the build process.

💡 What It Does:
----------------
- Step 0 → Generates a roadmap/plan prompt from the raw idea
- Step 1+ → Creates prompts to generate Python files/modules
- Keeps format consistent for structured GPT outputs (like JSON)

🧠 Example:
-----------
At step 0:
→ Generates a prompt asking GPT to return a roadmap and file list

At step 1+:
→ Asks GPT to return full working code for a single file like main.py

📦 Output format returned from GPT:
-----------------------------------
{
  "files": {
    "main.py": "<code here>"
  },
  "summary": "what the code does",
  "status": "in_progress" or "done"
}

✅ Keeps agent prompts clean and modular
✅ Makes LLM output easier to parse and save

"""


# class PromptGenerator:
#     def __init__(self):
#         pass

#     def generate_prompt(self, idea: str, step: int) -> str:
#         if step == 0:
#             return f"""
# You are a startup CTO. Your task is to break down the following startup idea:
# "{idea}"

# - Create a clear high-level roadmap of what needs to be built.
# - List the key components or files.
# - Keep it modular and developer-friendly.
# - Return your code **inside** ```python``` code blocks. Do not skip it.

# Return your response in this format:
# {{
#   "summary": "short summary of the build goal",
#   "files": {{
#     "main.py": "# description",
#     "utils.py": "# description",
#     ...
#   }}
# }}
# """
#         else:
#             return f"""
# You are an autonomous developer working on the project idea: "{idea}".

# Your current task is step {step}. Generate Python code for the next required file/module.
# - Use clean, executable code.
# - Include comments and follow good practices.
# - Return your code **inside** ```python``` code blocks. Do not skip it.

# - Return your output in this format:
# {{
#   "files": {{
#     "filename.py": "<code here>"
#   }},
#   "summary": "<what this step is doing>",
#   "status": "in_progress" or "done"
# }}
# """

#     def generate_final_prompt(self, project_name: str) -> str:
#         return f"""
# You have now finished building the project: "{project_name}".

# Please write a proper README.md enclosed within <readme>...</readme> tags.
# Include:
# - ✅ What this project does
# - ⚙️ How to run it locally (commands or steps)
# - 📦 Requirements & installation
# - 💡 Example usage

# Make sure the README is markdown-formatted.
# """



# prompt_generator.py – Generates prompts for each agent step

"""
prompt_generator.py – Creates prompts for each agent step

This module defines the `PromptGenerator` class which builds custom GPT prompts
based on the startup idea and the current step in the build process.

💡 What It Does:
----------------
- Step 0 → Generates a roadmap/plan prompt from the raw idea
- Step 1+ → Creates prompts to generate Python files/modules
- Keeps format consistent for structured GPT outputs (like JSON)

🧠 Example:
-----------
At step 0:
→ Generates a prompt asking GPT to return a roadmap and file list

At step 1+:
→ Asks GPT to return full working code for a single file like main.py

📦 Output format returned from GPT:
-----------------------------------
{
  "files": {
    "main.py": "<code here>"
  },
  "summary": "what the code does",
  "status": "in_progress" or "done"
}

✅ Keeps agent prompts clean and modular
✅ Makes LLM output easier to parse and save

"""


# class PromptGenerator:
#     def __init__(self):
#         pass

#     def generate_prompt(self, idea: str, step: int) -> str:
#         if step == 0:
#             return f"""
# You are a startup CTO. Your task is to break down the following startup idea:
# "{idea}"

# - Create a clear high-level roadmap of what needs to be built.
# - List the key components or files.
# - Keep it modular and developer-friendly.
# - Return your code **inside** ```python``` code blocks. Do not skip it.

# Return your response in this format:
# {{
#   "summary": "short summary of the build goal",
#   "files": {{
#     "main.py": "# description",
#     "utils.py": "# description",
#     ...
#   }}
# }}
# """
#         else:
#             return f"""
# You are an autonomous developer working on the project idea: "{idea}".

# Your current task is step {step}. Generate Python code for the next required file/module.
# - Use clean, executable code.
# - Include comments and follow good practices.
# - Return your code **inside** ```python``` code blocks. Do not skip it.

# - Return your output in this format:
# {{
#   "files": {{
#     "filename.py": "<code here>"
#   }},
#   "summary": "<what this step is doing>",
#   "status": "in_progress" or "done"
# }}
# """

#     def generate_final_prompt(self, project_name: str) -> str:
#         return f"""
# You have now finished building the project: "{project_name}".

# Please write a proper README.md enclosed within <readme>...</readme> tags.
# Include:
# - ✅ What this project does
# - ⚙️ How to run it locally (commands or steps)
# - 📦 Requirements & installation
# - 💡 Example usage

# Make sure the README is markdown-formatted.
# """




class PromptGenerator:
    def __init__(self):
        pass

    def generate_prompt(self, idea: str, step: int) -> str:
        if step == 0:
            return f"""
You are a startup CTO. Your task is to break down the following startup idea:
"{idea}"

- Create a clear high-level roadmap of what needs to be built.
- List the exact Python filenames required to build this project.
- Explain each file's purpose briefly.
- Return everything as a JSON dictionary wrapped inside a ```python code block.

Format:
```python
{{
  "summary": "short summary of the build goal",
  "files": {{
    "main.py": "# description",
    "utils.py": "# description",
    ...
  }}
}}
"""
        else:
    # fallback (shouldn’t be used when file-based loop is used)
            return f"""
        You are an autonomous developer working on the project idea: "{idea}".

    Your current task is step {step}. Generate Python code for the next required file/module.

Use clean, executable code.

Include comments and follow good practices.

Return your code inside a ```python code block.

Expected format:

{{
  "files": {{
    "filename.py": "<code here>"
  }},
  "summary": "<what this step is doing>",
  "status": "in_progress" or "done"
}}
"""


    def generate_file_prompt(self, idea: str, step: int, filename: str) -> str:
        return f"""
You are an autonomous Python developer building this project: "{idea}".

Now write the complete content of this file: {filename}

Include full working code with comments.

Do not explain — just return code in JSON format as shown below.

Wrap everything in ```[correct block type]``` based on the filename extension.

Expected format:


{{
  "files": {{
    "{filename}": "<code content here>"
  }},
  "summary": "what this file does",
  "status": "in_progress"
}}
"""
    def generate_final_prompt(self, project_name: str) -> str:
            return f"""
You have now finished building the project: "{project_name}".

Please write a proper README.md enclosed inside <readme>...</readme> tags.
Include:

✅ What this project does

⚙️ How to run it locally (step-by-step commands)

📦 Requirements & installation instructions

💡 Example usage (CLI or output sample)

Make sure the README is markdown-formatted.
"""
