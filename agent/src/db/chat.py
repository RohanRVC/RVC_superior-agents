# src/db/chat.py

import sqlite3
import json
from datetime import datetime
from typing import List, Optional, Literal



class ChatLogger:
    def __init__(self, db_path="logger/autofounder.db"):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        print(f"🔧 Creating table chat_history in {self.db_path}")
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS chat_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project TEXT,
                    role TEXT,
                    message TEXT,
                    timestamp TEXT
                )
            """)

    def save_chat_history(self, project: str, role: str, message: str):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT INTO chat_history (project, role, message, timestamp)
                VALUES (?, ?, ?, ?)
            """, (project, role, message, datetime.now().isoformat()))

    def get_chat_by_role(self, project: str, role: Optional[Literal["user", "assistant", "system"]] = None) -> List[str]:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            if role:
                cursor.execute("""
                    SELECT message FROM chat_history
                    WHERE project = ? AND role = ?
                    ORDER BY id ASC
                """, (project, role))
            else:
                cursor.execute("""
                    SELECT message FROM chat_history
                    WHERE project = ?
                    ORDER BY id ASC
                """, (project,))
            return [row[0] for row in cursor.fetchall()]
