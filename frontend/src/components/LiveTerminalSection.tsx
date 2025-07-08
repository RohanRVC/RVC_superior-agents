import React, { useState, useEffect } from 'react';
import { Terminal, Play, Pause } from 'lucide-react';

const terminalLogs = [
  "🚀 Welcome to AutoFounder OS 💪🏻🤖💖",
  "💡 What's your startup idea?",
  "> Build a personal portfolio website with Flask backend",
  "",
  "🤖 Model selected: OpenRouter (GPT-4)",
  "",
  "🧠 Starting AutoBuilder Agent...",
  "[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45",
  "[INFO] 📨 Prompt generated: You are a CTO building the following...",
  "[INFO] ✅ LLM response received, 586 tokens",
  "[INFO] 📄 Generated roadmap: main.py, routes.py, templates/index.html, static/css/styles.css",
  "",
  "🔁 Running step 1...",
  "[INFO] 🔍 Generated: main.py (Flask entry point)",
  "[INFO] 📄 Saved: logger/portfolio/code/main.py",
  "",
  "🔁 Running step 2...",
  "[INFO] 🔍 Generated: templates/index.html (HTML page)",
  "[INFO] 📄 Saved: logger/portfolio/code/templates/index.html",
  "",
  "🔁 Running step 3...",
  "[INFO] 🔍 Generated: static/css/styles.css (Styling)",
  "[INFO] 📄 Saved: logger/portfolio/code/static/css/styles.css",
  "",
  "🎉 Build complete. README.md created. Code available at /logger/portfolio",
  "📦 Project structure:",
  "├── main.py",
  "├── routes.py", 
  "├── templates/",
  "│   └── index.html",
  "├── static/",
  "│   └── css/",
  "│       └── styles.css",
  "└── README.md",
  "",
  "✨ Ready to deploy!"
];

const LiveTerminalSection: React.FC = () => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || currentIndex >= terminalLogs.length) return;

    const timer = setTimeout(() => {
      setDisplayedLogs(prev => [...prev, terminalLogs[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying]);

  const resetAnimation = () => {
    setDisplayedLogs([]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Live Terminal Output
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch AutoFounder in action as it builds your project step by step.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Terminal Window */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">AutoFounder Agent</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="p-1 rounded hover:bg-gray-700 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Play className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={resetAnimation}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
              <div className="space-y-1">
                {displayedLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`animate-fade-in ${
                      log.startsWith('[INFO]') 
                        ? 'text-gray-400' 
                        : log.startsWith('🚀') || log.startsWith('🎉') || log.startsWith('✨')
                        ? 'text-green-400 font-semibold'
                        : log.startsWith('💡') || log.startsWith('🤖') || log.startsWith('🧠')
                        ? 'text-blue-400'
                        : log.startsWith('>')
                        ? 'text-yellow-300'
                        : log.startsWith('🔁')
                        ? 'text-purple-400'
                        : log.startsWith('├') || log.startsWith('│') || log.startsWith('└')
                        ? 'text-cyan-400'
                        : 'text-gray-300'
                    }`}
                  >
                    {log || '\u00A0'}
                  </div>
                ))}
                {isPlaying && currentIndex < terminalLogs.length && (
                  <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Try It Now
            </button>
            <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white dark:hover:bg-gray-800">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTerminalSection;