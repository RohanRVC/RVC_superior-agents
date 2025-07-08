# autofounder.py – Agent flow controller

"""
Flow Controller: This handles the core execution loop for the BuilderAgent.
It controls the step-by-step progress of building a project from idea to files.

✅ Current MVP Flow:
----------------------
- Accepts a BuilderAgent object
- Calls `.step()` once to run the next generation cycle
- Handles errors and logs basic progress

🔮 Future Add-ons (Post-MVP):
-----------------------------
1. Auto-Retry Failed Steps:
   - If a generation step fails, automatically regenerate or retry

2. Multi-Step Loop:
   - Run `while not agent.done()` to complete full builds in one run
   - Useful for continuous mode (no user re-runs needed)

3. Execution Timing:
   - Track time taken per step (for analysis or performance tuning)

4. Live Logs and UI Hooks:
   - Print log file paths, live dashboard logs, or add websocket triggers

5. Post-Build Summary:
   - Log what files were generated and where they’re saved
   - Summary could include total tokens used or errors handled

6. Step History & Resume:
   - Resume builds from last saved step if interrupted

7. Copilot Integrations:
   - After file generation, send files to another agent for review or test writing

"""

def build_flow(agent, day=None):
    """
    Controls the build loop for each step.

    If a specific `day` is passed, it logs the context as part of demo mode.
    Otherwise, it continues the agent build process until done.
    """
    print("\n🧱 Starting Build Flow" + (f" for Day {day}" if day else "") + "...")

    try:
        agent.step()  # run one build step
    except Exception as e:
        print(f"❌ Error during build step: {e}")
        return

    print("✅ Step completed. Moving to next.")
