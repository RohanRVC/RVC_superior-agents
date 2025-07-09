# autofounder.py (updated with both demo and continuous mode)

"""
autofounder.py
--------------

🚀 Entry point for AutoFounder OS – a console-based autonomous agent system that
takes a startup idea and builds a project structure from scratch using LLMs.

💡 What It Does:
----------------
- Takes user input: startup idea, LLM model selection, API keys
- Initializes the core agent, prompt system, logger, and GPT connector
- Runs the agent in one of two modes:
    1. 'demo': Simulates 3 daily cycles (for hackathons, demos)
    2. 'continuous': Runs until all steps/tasks are completed
- Logs progress, builds multi-file code, and resumes safely if interrupted

🎛️ Configuration:
-----------------
- `RUN_MODE`: Can be set to `"demo"` or `"continuous"`
- API keys (OpenAI, Claude, OpenRouter) are loaded from `.env` or user input

🧠 Components Used:
-------------------
- `BuilderAgent`: Runs each build step, checks for completion
- `PromptGenerator`: Generates task prompts based on idea and step number
- `Genner`: Abstract LLM client (OpenAI, Claude, etc.)
- `SQLiteDB`: Stores agent progress and history (optional)
- `project_writer`: Saves generated files to disk
- `copilot_tracker`: Logs each step's result in JSON/txt for transparency

📂 Example Output:
------------------
Given input: "I want to build an AI tool that generates landing pages",
AutoFounder will:
- Generate roadmap
- Create files: `main.py`, `utils.py`, `requirements.txt`, etc.
- Save everything under `logger/ai_landing_page_generator/`

🔥 How To Run:
--------------
Run from terminal:
    python main.py

"""

# scripts/autofounder.py
# import os
# import time
# from dotenv import load_dotenv

# from agent.src.genner import get_genner
# from agent.src.db import SQLiteDB
# from agent.src.db import (
#     SQLiteDB,
#     export_as_json,
#     export_as_md,
# )
# from agent.src.logger.project_logger import log_info
# from agent.src.agent.builder import BuilderAgent
# from agent.src.agent.prompt_generator import PromptGenerator
# from agent.src.sensor.idea import IdeaSensor
# from agent.src.flows.autofounder import build_flow

# load_dotenv()

# def starter_prompt():
#     print("\n🚀 Welcome to AutoFounder OS 💪🏻🤖💖")

#     # Step 1: Get user idea
#     idea = input("💡 What's your startup idea?\n> ").strip()
#     if not idea:
#         print("❌ No idea entered. Exiting.")
#         return

#     # Step 2: Choose LLM model
#     print("\n🤖 Choose your LLM model:")
#     print("1. OpenAI\n2. Claude\n3. OpenRouter (default)")
#     model_choice = input("Enter model number [default = 3]: ").strip() or "3"
#     model_map = {"1": "openai", "2": "claude", "3": "openrouter"}
#     model = model_map.get(model_choice, "openrouter")

#     # Step 3: Choose run mode
#     mode_input = input("\n🕒 Run mode:\n1 = Continuous (full build)\n0 = Demo mode (3 short runs)\n> ").strip()
#     RUN_MODE = 'demo' if mode_input == "0" else 'continuous'

#     # Step 4: Ask for API key if missing
#     if model == "openai" and not os.getenv("OPENAI_API_KEY"):
#         os.environ["OPENAI_API_KEY"] = input("🔐 Enter your OpenAI API Key: ").strip()
#     elif model == "claude" and not os.getenv("ANTHROPIC_API_KEY"):
#         os.environ["ANTHROPIC_API_KEY"] = input("🔐 Enter your Claude API Key: ").strip()
#     elif model == "openrouter" and not os.getenv("OPENROUTER_API_KEY"):
#         os.environ["OPENROUTER_API_KEY"] = input("🔐 Enter your OpenRouter API Key: ").strip()

#     # Step 5: Initialize components
#     sensor = IdeaSensor()
#     sensor.set(idea)
#     prompt_gen = PromptGenerator()
#     genner = get_genner(
#         backend=model,
#         stream_fn=lambda token: print(token, end="", flush=True),
#     )
#     db = SQLiteDB()

#     # Step 6: Start the BuilderAgent
#     print("\n🧠 Starting AutoBuilder Agent...")
#     agent = BuilderAgent(
#         idea=idea,
#         sensor=sensor,
#         prompt_generator=prompt_gen,
#         genner=genner,
#         db=db,
#     )

#     # ✅ Resume previous session if exists
#     last_step = db.resume_session(agent.project_name)
#     if last_step:
#         print(f"🔄 Resuming from step {last_step}")
#         agent.step_count = last_step

#     # Run loop
    
#     if RUN_MODE == "demo":
#         for day in range(1, 4):
#             log_info(agent.project_name, f"📅 Running day {day} build cycle")
#             build_flow(agent, day=day)
#             time.sleep(3)
#     else:
#         step = agent.step_count
#         while not agent.done():
#             log_info(agent.project_name, f"🔁 Running step {step}")
#             build_flow(agent)
#             step += 1
#             time.sleep(2)
#         step=+1

#     # ✅ Export full history
#     export_as_json(agent.project_name)
#     export_as_md(agent.project_name)
#     print("📦 Chat history exported as `.json` and `.md`")
#     log_info(agent.project_name, f"🏁 AutoFounder completed at step {step}")
#     print(f"\n✅ Project build complete. See logs and code under logger/{agent.project_name}/")
    


# if __name__ == "__main__":
#     starter_prompt()


import os
import time
from dotenv import load_dotenv

from agent.src.genner import get_genner
from agent.src.db import SQLiteDB, export_as_json, export_as_md
from agent.src.logger.project_logger import log_info
from agent.src.agent.builder import BuilderAgent
from agent.src.agent.prompt_generator import PromptGenerator
from agent.src.sensor.idea import IdeaSensor
from agent.src.flows.autofounder import build_flow

load_dotenv()

def starter_prompt(user_idea=None):
    print("\n🚀 Welcome to AutoFounder OS 💪🏻🤖💖")

    # Step 1: Get startup idea
    idea = user_idea or os.getenv("IDEA")
    if not idea:
        idea = input("💡 What's your startup idea?\n> ").strip()
    if not idea:
        print("❌ No idea entered. Exiting.")
        return

    # Step 2: Choose model
    model_choice = os.getenv("MODEL_CHOICE", "")
    if not model_choice:
        print("\n🤖 Choose your LLM model:")
        print("1. OpenAI\n2. Claude\n3. OpenRouter (default)")
        model_choice = input("Enter model number [default = 3]: ").strip() or "3"
    model = {"1": "openai", "2": "claude", "3": "openrouter"}.get(model_choice, "openrouter")

    # Step 3: Choose run mode
    run_mode = os.getenv("RUN_MODE")
    if not run_mode:
        mode_input = input("\n🕒 Run mode:\n1 = Continuous (full build)\n0 = Demo mode (3 short runs)\n> ").strip()
        run_mode = "demo" if mode_input == "0" else "continuous"

    # Step 4: API Key setup
    if model == "openai" and not os.getenv("OPENAI_API_KEY"):
        os.environ["OPENAI_API_KEY"] = input("🔐 Enter your OpenAI API Key: ").strip()
    elif model == "claude" and not os.getenv("ANTHROPIC_API_KEY"):
        os.environ["ANTHROPIC_API_KEY"] = input("🔐 Enter your Claude API Key: ").strip()
    elif model == "openrouter" and not os.getenv("OPENROUTER_API_KEY"):
        if os.getenv("API_KEY"):
            os.environ["OPENROUTER_API_KEY"] = os.getenv("API_KEY").strip()
        else:
            raise ValueError("❌ API_KEY not found in environment.")

    # Step 5: Init components
    sensor = IdeaSensor()
    sensor.set(idea)
    prompt_gen = PromptGenerator()
    genner = get_genner(
        backend=model,
        stream_fn=lambda token: print(token, end="", flush=True),
    )
    db = SQLiteDB()

    # Step 6: Build agent
    print("\n🧠 Starting AutoBuilder Agent...")
    agent = BuilderAgent(
        idea=idea,
        sensor=sensor,
        prompt_generator=prompt_gen,
        genner=genner,
        db=db,
    )

    # Resume from last step
    last_step = db.resume_session(agent.project_name)
    if last_step:
        print(f"🔄 Resuming from step {last_step}")
        agent.step_count = last_step

    # Step 7: Run loop
    current_step = agent.step_count

    if run_mode == "demo":
        for day in range(1, 4):
            log_info(agent.project_name, f"📅 Running day {day} build cycle")
            build_flow(agent, day=day)
            time.sleep(3)
    else:
        while not agent.done():
            log_info(agent.project_name, f"🔁 Running step {agent.step_count}")
            build_flow(agent)
            time.sleep(2)
        current_step = agent.step_count

    # Step 8: Export results
    export_as_json(agent.project_name)
    export_as_md(agent.project_name)
    print("📦 Chat history exported as `.json` and `.md`")
    log_info(agent.project_name, f"🏁 AutoFounder completed at step {current_step}")
    print(f"\n✅ Project build complete. See logs and code under logger/{agent.project_name}/")


if __name__ == "__main__":
    starter_prompt()
