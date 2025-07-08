import React, { useState, useEffect } from 'react';
import { Terminal, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const terminalLogs = [
  '🚀 Welcome to AutoFounder OS 💪🏻🤖💖',
  '💡 What\'s your startup idea?',
  '> Build a SaaS dashboard with user authentication',
  '',
  '🤖 Model selected: OpenRouter (GPT-4)',
  '',
  '🧠 Starting AutoBuilder Agent...',
  '[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45',
  '[INFO] 📨 Prompt generated: You are a CTO building the following...',
  '[INFO] ✅ LLM response received, 1,247 tokens',
  '[INFO] 📄 Generated roadmap: app.py, models.py, templates/, static/, requirements.txt',
  '',
  '🔁 Running step 1...',
  '[INFO] 🔍 Generated: app.py (Flask application entry point)',
  '[INFO] 📄 Saved: logger/saas-dashboard/code/app.py',
  '',
  '🔁 Running step 2...',
  '[INFO] 🔍 Generated: models.py (Database models)',
  '[INFO] 📄 Saved: logger/saas-dashboard/code/models.py',
  '',
  '🔁 Running step 3...',
  '[INFO] 🔍 Generated: templates/dashboard.html (Main dashboard)',
  '[INFO] 📄 Saved: logger/saas-dashboard/code/templates/dashboard.html',
  '',
  '🔁 Running step 4...',
  '[INFO] 🔍 Generated: static/css/styles.css (Styling)',
  '[INFO] 📄 Saved: logger/saas-dashboard/code/static/css/styles.css',
  '',
  '🎉 Build complete. README.md created. Code available at /logger/saas-dashboard',
  '📦 Project structure:',
  '├── app.py',
  '├── models.py',
  '├── requirements.txt',
  '├── templates/',
  '│   ├── dashboard.html',
  '│   ├── login.html',
  '│   └── register.html',
  '└── static/',
  '    ├── css/styles.css',
  '    └── js/main.js',
  '',
  '✅ Ready for deployment!',
];

const LiveTerminalSection: React.FC = () => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < terminalLogs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, terminalLogs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const resetAnimation = () => {
    setDisplayedLogs([]);
    setCurrentIndex(0);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Live Terminal Output
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch AutoFounder build your project in real-time. Every step is logged and transparent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Terminal className="h-4 w-4" />
                  <span className="text-sm font-mono">AutoFounder Agent Terminal</span>
                </div>
              </div>
              
              <button
                onClick={resetAnimation}
                className="text-gray-400 hover:text-white text-sm font-mono transition-colors"
              >
                Replay
              </button>
            </div>

            {/* Terminal content */}
            <div className="p-6 h-96 overflow-y-auto">
              <div className="space-y-1">
                {displayedLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="terminal-line text-green-400"
                  >
                    {log || '\u00A0'}
                  </motion.div>
                ))}
                
                {currentIndex < terminalLogs.length && (
                  <div className="terminal-line text-green-400 border-r-2 border-green-400 animate-pulse">
                    <span className="opacity-0">_</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-t border-gray-700">
              <div className="text-gray-400 text-sm font-mono">
                Build Status: {currentIndex >= terminalLogs.length ? 'Complete' : 'Running...'}
              </div>
              
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download Code</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>Export Logs</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTerminalSection;