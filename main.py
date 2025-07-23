### woring perefect without autoscrolling
# import streamlit as st
# import subprocess
# import tempfile
# import os
# import zipfile
# from pathlib import Path
# from dotenv import load_dotenv

# # Load .env vars
# load_dotenv()

# st.set_page_config(page_title="AutoFounder UI", layout="centered")
# st.title("🤖 AutoFounder — Build Your Startup Automatically")

# # --- Build Form ---
# with st.form("build_form"):
#     idea = st.text_input("💡 What's your startup idea?")
#     model = st.selectbox("🤖 Choose your LLM model", ["OpenRouter (default)", "OpenAI", "Claude"])
#     mode = st.radio("🕒 Run Mode", ["Demo (3 steps)", "Continuous (full build)"])
#     api_key = st.text_input("🔐 Enter your API key", type="password")
#     submitted = st.form_submit_button("🚀 Build Project")

# # Map dropdown to env values
# model_map = {
#     "OpenRouter (default)": "3",
#     "OpenAI": "1",
#     "Claude": "2"
# }
# run_mode_map = {
#     "Demo (3 steps)": "demo",
#     "Continuous (full build)": "continuous"
# }

# # --- Trigger Build ---
# if submitted:
#     if not idea:
#         st.error("❗ Please enter your startup idea.")
#     elif not api_key:
#         st.error("❗ API Key is required.")
#     else:
#         st.success("🧠 Starting AutoBuilder Agent...")

#         # Set environment variables
#         os.environ["MODEL_CHOICE"] = model_map[model]
#         os.environ["RUN_MODE"] = run_mode_map[mode]
#         os.environ["API_KEY"] = api_key

#         with st.spinner("⚙️ Running AutoFounder agent..."):
#             env = os.environ.copy()
#             env["PYTHONIOENCODING"] = "utf-8"

#             process = subprocess.Popen(
#                 ["python", "run_agent.py", idea],
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.STDOUT,
#                 bufsize=1,
#                 universal_newlines=True,
#                 encoding="utf-8",
#                 errors="replace",
#                 env=env,
#             )

#             logs_area = st.empty()
#             log_output = ""
#             success = True

#             for line in process.stdout:
#                 log_output += line
#                 logs_area.code(log_output, language="bash")
#                 if "❌" in line or "Error" in line:
#                     success = False

#             process.wait()

#         if success:
#             st.success("✅ Project build completed!")
#         else:
#             st.error("Project ✅ Build completed with some bugs. Please check logs above.\n Later bugs were fixed ")

#         # --- File download section ---
#         from agent.src.helper import slugify  # if not available, fallback to simple slug logic
#         try:
#             slug = slugify(idea)[:40]
#         except:
#             slug = idea.lower().replace(" ", "_").replace("-", "_")[:40]

#         logger_path = Path(f"logger/{slug}")
#         filemap_path = logger_path / ".filemap.json"
#         readme_path = logger_path / "README.md"

#         if filemap_path.exists():
#             st.download_button("📄 Download `.filemap.json`", filemap_path.read_bytes(), file_name=".filemap.json")

#         if readme_path.exists():
#             st.download_button("📘 Download `README.md`", readme_path.read_bytes(), file_name="README.md")

#         # Create a ZIP of the full project
#         zip_path = Path(tempfile.gettempdir()) / f"{slug}.zip"
#         with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
#             for folder, _, files in os.walk(logger_path):
#                 for file in files:
#                     full_path = os.path.join(folder, file)
#                     rel_path = os.path.relpath(full_path, start=logger_path)
#                     zipf.write(full_path, arcname=rel_path)

#         st.download_button("📦 Download Full Project (.zip)", zip_path.read_bytes(), file_name=f"{slug}.zip")

# streamlit_app.py

# streamlit_app.py

import streamlit as st
import subprocess
import tempfile
import os
import zipfile
from pathlib import Path
from dotenv import load_dotenv
import streamlit.components.v1 as components

# Load .env variables
load_dotenv()

st.set_page_config(page_title="AutoFounder UI", layout="centered")
st.title("🤖 AutoFounder — Build Your Startup Automatically")

# --- Build Form ---
with st.form("build_form"):
    idea = st.text_input("💡 What's your startup idea?")
    model = st.selectbox("🤖 Choose your LLM model", ["OpenRouter (default)", "OpenAI", "Claude"])
    mode = st.radio("🕒 Run Mode", ["Demo (3 steps)", "Continuous (full build)"])
    api_key = st.text_input("🔐 Enter your API key (Optional)", type="password")
    submitted = st.form_submit_button("🚀 Build Project")

# Map model/mode to env values
model_map = {
    "OpenRouter (default)": "3",
    "OpenAI": "1",
    "Claude": "2"
}
run_mode_map = {
    "Demo (3 steps)": "demo",
    "Continuous (full build)": "continuous"
}

# --- Trigger Build ---
if submitted:
    if not idea:
        st.error("❗ Please enter your startup idea.")
    # elif not api_key:
    #     st.error("❗ API Key is required.")
    else:
        st.success("🧠 Starting AutoBuilder Agent...")

        # Set env vars
        os.environ["MODEL_CHOICE"] = model_map[model]
        os.environ["RUN_MODE"] = run_mode_map[mode]
        os.environ["API_KEY"] = api_key

        with st.spinner("⚙️ Running AutoFounder agent..."):
            env = os.environ.copy()
            env["PYTHONIOENCODING"] = "utf-8"

            # Start subprocess
            process = subprocess.Popen(
                ["python", "run_agent.py", idea],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                bufsize=1,
                universal_newlines=True,
                encoding="utf-8",
                errors="replace",
                env=env,
            )

            logs_area = st.empty()
            log_output = ""
            success = True

            for line in process.stdout:
                log_output += line
                logs_area.code(log_output, language="bash")

                # Smooth scroll to bottom (render after logs)
                components.html("""
                    <script>
                        var el = window.document.querySelectorAll('.element-container textarea')?.[0];
                        if(el) el.scrollTop = el.scrollHeight;
                    </script>
                """, height=0)

                if "❌" in line or "Error" in line:
                    success = False

            process.wait()

        # Status message
        if success:
            st.success("✅ Project build completed!")
        else:
            st.warning("⚠️ Build finished with some issues. Check logs above.")

        # --- File Downloads ---
        try:
            from agent.src.helper import slugify
            slug = slugify(idea)[:40]
        except:
            slug = idea.lower().replace(" ", "_").replace("-", "_")[:40]

        logger_path = Path(f"logger/{slug}")
        filemap_path = logger_path / ".filemap.json"
        readme_path = logger_path / "README.md"

        if filemap_path.exists():
            st.download_button("📄 Download `.filemap.json`", filemap_path.read_bytes(), file_name=".filemap.json")

        if readme_path.exists():
            st.download_button("📘 Download `README.md`", readme_path.read_bytes(), file_name="README.md")

        # Create and offer ZIP download
        zip_path = Path(tempfile.gettempdir()) / f"{slug}.zip"
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for folder, _, files in os.walk(logger_path):
                for file in files:
                    full_path = os.path.join(folder, file)
                    rel_path = os.path.relpath(full_path, start=logger_path)
                    zipf.write(full_path, arcname=rel_path)

        st.download_button("📦 Download Full Project (.zip)", zip_path.read_bytes(), file_name=f"{slug}.zip")
