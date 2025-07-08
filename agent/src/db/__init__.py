from agent.src.db.chat import ChatLogger#, save_chat_history, get_chat_by_role
from agent.src.db.steps import StepLogger#, save_last_step, resume_session
from agent.src.db.export import export_as_json, export_as_md
import os

class SQLiteDB(ChatLogger,StepLogger):
    def __init__(self, db_path="logger/autofounder.db"):
        os.makedirs(os.path.dirname(db_path), exist_ok=True)  # ✅ ensure folder exists
        print(f"🔧 Initializing SQLiteDB at {db_path}")  # ✅ Add this debug line
        StepLogger.__init__(self, db_path)
        ChatLogger.__init__(self, db_path)

__all__ = [
    "SQLiteDB",

    "export_as_json", "export_as_md"
]
