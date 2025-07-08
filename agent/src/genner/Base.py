# Base.py – Genner: LLM Interface Layer

"""
The base.py file defines the LLM interface layer — a clean blueprint that every LLM generator (like OpenAI, Ollama, Claude, etc.) must follow.

✅ Purpose in Simple Terms:
Feature	What It Does
🧬 Abstract Interface	It tells all LLMs: “You must know how to take a ChatHistory and generate code + response.”
🔄 Unified Calling	No matter which model you plug in (OpenAI, Ollama, Claude), they all respond the same way.
✅ Safe Results	It wraps LLM output in a Result object to catch errors cleanly without crashing.

🧩 What It Connects To:
Called by your BuilderAgent → self.genner.generate_code(self.chat_history)

Implemented by actual backends like OllamaGenner, OpenAIGenner, etc.

Returns:

a dict of file names + code ("main.py": "...")

a full raw LLM response string

or an error if something went wrong

📌 Example Analogy:
Think of base.py as a universal remote control.

It doesn’t care what TV you use (Ollama, OpenAI, Claude) — it just defines what buttons need to be present.
Each brand (backend) implements those buttons how they want — but they all respond to the same commands.
"""

from agent.src.types import ChatHistory
from result import Result
from typing import Dict, Tuple
from abc import ABC, abstractmethod

class Genner(ABC):
    def __init__(self, name: str = "", stream: bool = False):
        self.name = name
        self.do_stream = stream
        pass
    @abstractmethod
    def generate_code(self, chat: ChatHistory) -> Result[Tuple[Dict[str, str], str], str]:
        """
        Abstract method to generate code and trackable summary from LLM using conversation context.

        Args:
            chat (ChatHistory): The conversation history so far.

        Returns:
            Result[Tuple[Dict[str, str], str], str]: On success:
                - dict: filename → code content
                - str: raw response text
            On failure:
                - str: error message
        """
        
        raise NotImplementedError("LLM backend must implement `generate_code()`.")
