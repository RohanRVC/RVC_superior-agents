# 🚀 AutoFounder: Prompt-to-Product AI Agent

AutoFounder is a fully autonomous Python agent that takes a single-line idea prompt and generates a full working codebase — complete with files, folders, logic, and README.



Think of it like a **CTO-in-a-box** that turns ideas into software step by step.

---

## 🌟 Features

- 🧠 **Autonomous Agent**: Uses LLMs to reason, plan, and build files one by one.
- 📁 **Multi-file Support**: Supports any file type — `.py`, `.html`, `.css`, `.js`, etc.
- 📦 **Code Folder Structure**: Saves outputs with real folder nesting (e.g., `templates/`, `static/css/`).
- 📝 **Copilot Tracking**: Logs every build step and conversation in `.json`.
- 🔁 **Session Resume**: Continues from the last build step using SQLite DB.
- 🧾 **Auto README.md**: Writes a project README at the end automatically.
- 🗂️ **File Map Log**: Saves `.filemap.json` to track what files were created.
- 🤖 **RAG Build**: RAG integration (planned) to let the agent learn from custom datasets and documentation.
- 🫙 **Containerization**: Built with containerization in mind — easily deployable using Docker for consistent local or cloud runs.

---

## 🧰 How It Works

1. You give a startup/product idea as input
2. AutoFounder runs `Step 0` to create a roadmap of files to build
3. It then builds each file in a separate step
4. Once done, it generates a `README.md` file
5. Code is saved inside `logger/<your_project>/code/`

---

## 🧪 Example Prompt

```bash
"Build a job board web app with Flask backend and responsive HTML/CSS frontend"
🎯 Output:

main.py, routes.py, models.py, config.py

templates/index.html, about.html

static/css/styles.css, static/js/app.js

README.md, .filemap.json

🧑‍💻 Run Locally
bash
Copy
Edit
git clone https://github.com/yourusername/autofounder.git
cd autofounder
pip install -r requirements.txt
Create a .env file:

env

OPENROUTER_API_KEY=your_key
Then run the agent:

##AutoFounder project structure

superior-agent/
├── agent/
│   ├── db/
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   ├── export.py
│   │   ├── interface.py
│   │   ├── sqlite.py
│   │   └── steps.py
│   ├── scripts/
│   │   ├── __init__.py
│   │   ├── autofounder.py
│   │   └── main.py
│   ├── src/
│   │   ├── agent/
│   │   │   ├── __init__.py
│   │   │   ├── builder.py
│   │   │   └── prompt_generator.py
│   │   ├── client/
│   │   │   ├── openrouter.py
│   │   │   └── rag.py
│   │   ├── flow/
│   │   │   └── autofounder.py
│   │   ├── genner/
│   │   │   ├── __init__.py
│   │   │   ├── Base.py
│   │   │   └── OpenRouterGenner.py
│   │   ├── logger/
│   │   │   └── all.py
│   │   ├── sensor/
│   │   │   └── idea.py
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── helper.py
│   │   └── types.py
|
└── main.py

## Project structure created by Agent

superior-agent/
|
├── logger/
│   └── <project-slug>/
│       ├── code/
│       │   └── ...                     # Generated files (main.py, templates/, etc.)
│       ├── README.md
│       ├── .filemap.json
│       ├── system.log
│       └── steps/
│           ├── step_0.json
│           ├── step_1.json
│           └── ...

├── .env
├── autofounder.db
├── main.py
└── requirements.txt


python main.py
📂 Output Structure
bash
Copy
Edit
logger/
└── your_project/
    ├── code/
    │   ├── main.py
    │   ├── static/js/app.js
    │   └── templates/index.html
    ├── README.md
    ├── .filemap.json
    ├── system.log
    └── steps/
        ├── step_0.json
        ├── step_1.json
        └── ...
🧠 Architecture
BuilderAgent – core agent logic

PromptGenerator – decides what to ask the LLM each step

Genner – LLM wrapper (supports OpenRouter, OpenAI, Claude)

SQLiteDB – stores chat history + last build step

Logger – writes code files, summaries, .filemap.json

🛠️ Tech Stack
Python 3.10+

SQLite (for step tracking)

Any LLM via OpenRouter (or plug your own)

Markdown / JSON / File I/O

📄 License
RIVAC – do whatever you want 🚀

🤝 Contribute
Have feedback, features or bugs? Raise an issue or drop a PR!

Built with ❤️ by Rohan Vinay Chaudhary



---

