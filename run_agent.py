import sys
from agent.scripts.autofounder import starter_prompt
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Error: Please provide a startup idea as an argument.")
        sys.exit(1)

    user_idea = sys.argv[1]
    starter_prompt(user_idea=user_idea)
