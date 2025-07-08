# src/genner/OpenRouterGenner.py

import re
import yaml
from typing import Callable, List, Tuple

from result import Err, Ok, Result
from agent.src.client.openrouter import OpenRouter
from agent.src.config import OpenRouterConfig
from agent.src.helper import extract_content, nanoid, timestamp_now
from agent.src.types import ChatHistory
from agent.src.logger.project_logger import log_info
from .Base import Genner


class OpenRouterGenner(Genner):
    def __init__(
        self,
        client: OpenRouter,
        config: OpenRouterConfig,
        stream_fn: Callable[[str], None] | None,
    ):
        """
        Initialize the OpenRouter-based generator.
        """
        super().__init__()
        self.client = client
        self.config = config
        self.stream_fn = stream_fn
        self.do_stream = stream_fn is not None  # ✅ needed for streaming logic

    def ch_completion(self, messages: ChatHistory) -> Result[str, str]:
        """
        Generate a completion using the OpenRouter API.
        """
        final_response = ""

        try:
            if self.do_stream:
                assert self.stream_fn is not None
                stream_ = self.client.create_chat_completion_stream(
                    messages=messages.as_native(),
                    model=self.config.model,
                    max_tokens=self.config.max_tokens,
                    temperature=self.config.temperature,
                )

                token_counts = 0
                for token, token_type in stream_:
                    if token_type == "main":
                        final_response += token
                        self.stream_fn(token)
                    token_counts += 1
                    if token_counts >= self.config.max_tokens:
                        break
                self.stream_fn("\n")
            else:
                final_response = self.client.create_chat_completion(
                    messages=messages.as_native(),
                    model=self.config.model,
                    max_tokens=self.config.max_tokens,
                    temperature=self.config.temperature,
                )
            assert isinstance(final_response, str)
        except AssertionError as e:
            return Err(f"OpenRouterGenner.{self.config.model}.ch_completion error:\n{e}")
        except Exception as e:
            return Err(f"OpenRouterGenner.{self.config.model}.ch_completion unexpected error:\n{e}")

        return Ok(final_response)

    def generate_code(
        self, messages: ChatHistory, blocks: List[str] = [""]
    ) -> Result[Tuple[List[str], str], str]:
        """
        Generate code using OpenRouter and extract from response.
        Logs progress and errors using project logger.
        """
        raw_response = ""
        run_id = nanoid(8)
        log_info("openrouter", f"[{run_id}] 🚀 Code generation started at {timestamp_now()}")

        try:
            completion_result = self.ch_completion(messages)

            if err := completion_result.err():
                log_info("openrouter", f"[{run_id}] ❌ Completion error: {err}")
                return Ok(([], raw_response)) if raw_response else Err(err)

            raw_response = completion_result.unwrap()
            print("\n🧠 OpenRouter returned:\n", raw_response[:500])
            print("\n🔍 RAW LLM RESPONSE:\n" + raw_response + "\n" + "-"*100)
            log_info("openrouter", f"[{run_id}] ✅ Completion received. Extracting code...")

            extract_code_result = self.extract_code(raw_response, blocks)

            if err := extract_code_result.err():
                log_info("openrouter", f"[{run_id}] ⚠️ Code extraction failed: {err}")
                return Ok(([], raw_response))

            log_info("openrouter", f"[{run_id}] ✅ Code extraction successful.")
            return Ok((extract_code_result.unwrap(), raw_response))

        except Exception as e:
            log_info("openrouter", f"[{run_id}] ❌ Exception during generation: {e}")
            return Ok(([], raw_response)) if raw_response else Err(str(e))

    def generate_list(
        self, messages: ChatHistory, blocks: List[str] = [""]
    ) -> Result[Tuple[List[List[str]], str], str]:
        """
        Generate list of items using OpenRouter.
        """
        try:
            completion_result = self.ch_completion(messages)
            if err := completion_result.err():
                return Err(err)
            raw_response = completion_result.unwrap()
            extract_list_result = self.extract_list(raw_response, blocks)
            if err := extract_list_result.err():
                return Err(err)
            extracted_list = extract_list_result.unwrap()
            return Ok((extracted_list, raw_response))
        except Exception as e:
            return Err(str(e))

    @staticmethod
    def extract_code(response: str, blocks: List[str] = [""]) -> Result[List[str], str]:
        """
        Extract code blocks using regex.
        """
        extracts: List[str] = []
        for block in blocks:
            try:
                resp = extract_content(response, block)
                regex_pattern = r"```python\n([\s\S]*?)```"
                match = re.search(regex_pattern, resp, re.DOTALL)
                if match and match.group(1):
                    extracts.append(match.group(1))
            except Exception as e:
                return Err(str(e))
        return Ok(extracts)

    @staticmethod
    def extract_list(response: str, blocks: List[str] = [""]) -> Result[List[List[str]], str]:
        """
        Extract list of items in YAML format.
        """
        extracts: List[List[str]] = []
        for block in blocks:
            try:
                resp = extract_content(response, block)
                regex_pattern = r"```yaml\n(.*?)```"
                match = re.search(regex_pattern, resp, re.DOTALL)
                if match:
                    content = yaml.safe_load(match.group(1).strip())
                    if isinstance(content, list) and all(isinstance(item, str) for item in content):
                        extracts.append(content)
            except Exception as e:
                return Err(str(e))
        return Ok(extracts)
