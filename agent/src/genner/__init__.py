# src/genner/__init__.py

from typing import Callable
import os
from dotenv import load_dotenv

from openai import OpenAI  # currently unused but kept for future
from agent.src.client.openrouter import OpenRouter
from agent.src.config import OpenRouterConfig
from agent.src.genner.OpenRouterGenner import OpenRouterGenner
from agent.src.genner.Base import Genner  # ✅ Base interface

load_dotenv()

__all__ = ["get_genner", "Genner"]


def get_genner(
    backend: str,
    stream_fn: Callable[[str], None] | None = None,
    or_client: OpenRouter | None = None,
    anthropic_client: None = None,  # placeholder
) -> Genner:
    """
    Factory function to return the correct Genner instance based on backend name.
    Defaults to OpenRouter with DeepSeek model.
    """
    default_model = "deepseek/deepseek-chat-v3-0324:free"
    openrouter_config = OpenRouterConfig(model=default_model)

    if backend == "openrouter":
        if not or_client:
            or_client = OpenRouter(api_key=os.getenv("OPENROUTER_API_KEY"))
        return OpenRouterGenner(or_client, openrouter_config, stream_fn)

    raise ValueError(f"❌ Unsupported backend: {backend}")



# ✅ Optional Enhancements for Future Use
# ---------------------------------------
# 1. Retrieval by Role/Time:
#    - Filter chat history by 'assistant', 'user', or timestamps
#    - Useful for UI dashboards or debugging flows

# 2. Auto-Resume Last Session:
#    - Store last step + chat_history to disk/DB
#    - On rerun, load and resume from exact point

# 3. Export Options:
#    - Save full session to `.json` for dev workflows
#    - Save to `.md` for GitHub-style readmes or documentation
