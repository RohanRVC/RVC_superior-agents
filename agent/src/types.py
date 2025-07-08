# src/types.py – ChatHistory class for agent memory

from typing import List, Literal

MessageRole = Literal["system", "user", "assistant"]

class ChatHistory:
    def __init__(self):
        self.history: List[dict] = []

    def add(self, role: MessageRole, content: str):
        self.history.append({"role": role, "content": content})

    def add_system(self, content: str):
        self.add("system", content)

    def add_user(self, content: str):
        self.add("user", content)

    def add_assistant(self, content: str):
        self.add("assistant", content)

    def get_latest_response(self) -> str:
        for msg in reversed(self.history):
            if msg["role"] == "assistant":
                return msg["content"]
        return ""

    def get_latest_instruction(self) -> str:
        for msg in reversed(self.history):
            if msg["role"] == "user":
                return msg["content"]
        return ""

    def as_native(self) -> List[dict]:
        """
        Returns message list in OpenAI/Ollama-compatible format
        """
        return self.history

    def __str__(self):
        return "\n".join(f"{m['role']}: {m['content']}" for m in self.history)
