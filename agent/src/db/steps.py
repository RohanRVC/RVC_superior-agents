# src/db/steps.py

import sqlite3
from typing import Optional

class StepLogger:
    def __init__(self, db_path="logger/autofounder.db"):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        print(f"🔧 Creating table last_step in {self.db_path}")

        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS last_step (
                    project TEXT PRIMARY KEY,
                    step INTEGER
                )
            """)

    def save_last_step(self, project: str, step: int):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT OR REPLACE INTO last_step (project, step)
                VALUES (?, ?)
            """, (project, step))

    def resume_session(self, project: str) -> Optional[int]:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                SELECT step FROM last_step
                WHERE project = ?
            """, (project,))
            row = cursor.fetchone()
            return row[0] if row else 0
