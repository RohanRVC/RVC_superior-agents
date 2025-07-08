import { useState } from 'react';
import { motion } from 'framer-motion';
import BuildForm from '../components/BuildForm';
import Terminal from '../components/Terminal';

interface FormData {
  idea: string;
  model: 'openai' | 'claude' | 'openrouter';
  mode: 'demo' | 'continuous';
  apiKey: string;
}

const BuildPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSubmit = (formData: FormData) => {
    setIsLoading(true);
    
    // Clear previous logs
    setLogs([]);
    
    // Simulate log generation
    const simulateLogs = () => {
      const allLogs = [
        '🚀 Welcome to AutoFounder OS 💪🏻🤖💖',
        `💡 Processing idea: "${formData.idea}"`,
        `🤖 Model selected: ${formData.model === 'openai' ? 'OpenAI' : formData.model === 'claude' ? 'Claude' : 'OpenRouter'}`,
        `🧠 Starting AutoBuilder Agent in ${formData.mode} mode...`,
        '[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45',
        '[INFO] 📨 Prompt generated: You are a CTO building the following...',
        '[INFO] ✅ LLM response received, 586 tokens',
        '[INFO] 📄 Generated roadmap with files to build',
        '🔁 Running step 1...',
        '[INFO] 🔍 Generating: main.py (entry point)',
        '[INFO] 📄 Saved: logger/project_name/code/main.py',
        '🔁 Running step 2...',
        '[INFO] 🔍 Generating: utils.py (helper functions)',
        '[INFO] 📄 Saved: logger/project_name/code/utils.py',
        '🔁 Running step 3...',
        '[INFO] 🔍 Generating: templates/index.html (main template)',
        '[INFO] 📄 Saved: logger/project_name/code/templates/index.html',
      ];
      
      // Add logs one by one with delay
      let i = 0;
      const interval = setInterval(() => {
        if (i < allLogs.length) {
          setLogs(prev => [...prev, allLogs[i]]);
          i++;
        } else {
          clearInterval(interval);
          
          // Add completion message after all logs
          setTimeout(() => {
            setLogs(prev => [
              ...prev, 
              '🎉 Build complete! README.md created.',
              '📂 Code available at /logger/project_name'
            ]);
            setIsLoading(false);
          }, 1000);
        }
      }, 500);
    };
    
    // Start log simulation after a short delay
    setTimeout(simulateLogs, 1000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Build Your Project</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter your idea, select your preferences, and let AutoFounder build your project from scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Build Form */}
          <div>
            <BuildForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Terminal Output */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Build Output</h2>
              <Terminal logs={logs} isLoading={isLoading} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPage;