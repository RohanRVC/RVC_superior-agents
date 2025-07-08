import os
import requests
import json
from dotenv import load_dotenv
from typing import List, Tuple, Iterator, Optional

load_dotenv()


class OpenRouter:
    def __init__(self, base_url: str = "https://openrouter.ai/api/v1", api_key: Optional[str] = None):
        self.base_url = base_url
        self.api_key = api_key or os.getenv("OPENROUTER_API_KEY")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "http://localhost",
            "X-Title": "autofounder-agent",
            "Content-Type": "application/json",
        }

    def create_chat_completion(
        self,
        messages: List[dict],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        """
        Standard non-streaming OpenRouter call.
        """
        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        response = requests.post(f"{self.base_url}/chat/completions", json=payload, headers=self.headers)

        # Debug print to verify status and raw output
        print("🔁 [OpenRouter] Status Code:", response.status_code)
        print("📦 [OpenRouter] Raw Response:", response.text[:300], "..." if len(response.text) > 300 else "")

        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    def create_chat_completion_stream(
        self,
        messages: List[dict],
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> Iterator[Tuple[str, str]]:
        """
        Streaming OpenRouter call (yields token-by-token output).
        """
        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": True,
        }

        with requests.post(f"{self.base_url}/chat/completions", json=payload, headers=self.headers, stream=True) as resp:
            print("📡 [OpenRouter] Stream Status Code:", resp.status_code)
            resp.raise_for_status()

            for line in resp.iter_lines():
                if line and line.startswith(b"data: "):
                    content = line.replace(b"data: ", b"").decode("utf-8")
                    if content == "[DONE]":
                        break
                    try:
                        parsed = json.loads(content)  # ✅ safe replacement for eval()
                        token = parsed["choices"][0]["delta"].get("content", "")
                        if token:
                            yield (token, "main")
                    except Exception as e:
                        print("⚠️ Stream parse error:", e)
                        continue
