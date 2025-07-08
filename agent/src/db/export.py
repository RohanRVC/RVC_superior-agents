import sqlite3
import json
from typing import Literal
from datetime import datetime


def export_as_json(project: str, db_path="logger/autofounder.db") -> str:
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT role, message, timestamp FROM chat_history
            WHERE project = ?
            ORDER BY id ASC
        """, (project,))
        rows = cursor.fetchall()

    export_data = [
        {"role": row[0], "message": row[1], "timestamp": row[2]}
        for row in rows
    ]

    filename = f"logger/{project}/{project}_history.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)

    return filename


def export_as_md(project: str, db_path="logger/autofounder.db") -> str:
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT role, message FROM chat_history
            WHERE project = ?
            ORDER BY id ASC
        """, (project,))
        rows = cursor.fetchall()

    md_lines = ["# 💬 AutoFounder Chat Log\n"]
    for role, message in rows:
        md_lines.append(f"**{role.title()}**:\n```\n{message}\n```\n")

    filename = f"logger/{project}/{project}_history.md"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))

    return filename
