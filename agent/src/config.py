# src/config.py

from dataclasses import dataclass
from abc import ABC


@dataclass
class BaseLLMConfig(ABC):
    """
    Abstract base config for LLMs.
    """
    pass


@dataclass
class OpenRouterConfig(BaseLLMConfig):
    """
    Configuration for OpenRouter-backed models.

    Attributes:
        name (str): Display name (optional)
        model (str): Model identifier for OpenRouter (e.g., 'google/gemini-2.5-flash-lite-preview-06-17')
        max_tokens (int): Maximum tokens allowed
        temperature (float): Sampling temperature (0 = deterministic, 1 = creative)
    """
    name: str = "openrouter"
    model: str = "deepseek/deepseek-chat-v3-0324:free"
    max_tokens: int = 1000
    temperature: float = 0.7
