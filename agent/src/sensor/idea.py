# idea.py – A simple sensor to store and retrieve the user’s project idea

"""
idea.py – Sensor to store the original idea and metadata

This module defines the `IdeaSensor` class, which acts as a lightweight memory unit
for the agent. It holds the startup idea entered by the user and optionally stores
related metadata such as category, user intent, or tags.

💡 Purpose:
-----------
- Holds the main idea throughout the agent’s lifecycle
- Provides reusable access to the idea across agent components
- Optionally supports storing metadata like:
  - goal: "automation"
  - category: "data science"
  - source: "user input"

🔁 Usage:
---------
sensor = IdeaSensor()
sensor.set("Build a chart from Excel", metadata={"goal": "visualization"})
idea = sensor.get()                    # returns "Build a chart from Excel"
goal = sensor.get_meta("goal")        # returns "visualization"

✅ Keeps the idea decoupled from agent logic.
✅ Allows other agents or modules to reuse it without hardcoding.

"""


class IdeaSensor:
    def __init__(self):
        self.idea = ""
        self.meta = {}

    def set(self, idea: str, metadata: dict | None = None) -> None:
        """Set the idea and optionally update metadata.
        
        Args:
            idea (str): The project idea to store.
            metadata (dict | None): Optional metadata to update.
        """
        self.idea = idea
        if metadata:  # Only update if metadata is provided (non-empty)
            self.meta.update(metadata)

    def get(self) -> str:
        return self.idea

    def get_meta(self, key: str, default=None):
        return self.meta.get(key, default)

    def all_meta(self) -> dict:
        return self.meta.copy()
