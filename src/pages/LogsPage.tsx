import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fullLogs = [
  '🚀 Welcome to AutoFounder OS 💪🏻🤖💖',
  '💡 What\'s your startup idea?',
  '> Build a personal portfolio website with Flask backend',
  '',
  '🤖 Model selected: OpenRouter (GPT-4)',
  '',
  '🧠 Starting AutoBuilder Agent...',
  '[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45',
  '[INFO] 📨 Prompt generated: You are a CTO building the following startup idea...',
  '[INFO] ✅ LLM response received, 586 tokens',
  '[INFO] 📄 Generated roadmap: main.py, routes.py, templates/index.html, static/css/styles.css',
  '',
  '🔁 Running step 1...',
  '[INFO] 🔍 Generated: main.py (Flask entry point)',
  '[INFO] 📄 Saved: logger/portfolio/code/main.py',
  '[DEBUG] File size: 2.1KB',
  '[DEBUG] Dependencies: Flask, render_template, request',
  '',
  '🔁 Running step 2...',
  '[INFO] 🔍 Generated: routes.py (Application routes)',
  '[INFO] 📄 Saved: logger/portfolio/code/routes.py',
  '[DEBUG] File size: 1.8KB',
  '[DEBUG] Routes: /, /about, /contact, /projects',
  '',
  '🔁 Running step 3...',
  '[INFO] 🔍 Generated: templates/index.html (Homepage template)',
  '[INFO] 📄 Saved: logger/portfolio/code/templates/index.html',
  '[DEBUG] File size: 3.2KB',
  '[DEBUG] Template engine: Jinja2',
  '',
  '🔁 Running step 4...',
  '[INFO] 🔍 Generated: templates/base.html (Base template)',
  '[INFO] 📄 Saved: logger/portfolio/code/templates/base.html',
  '[DEBUG] File size: 1.5KB',
  '',
  '🔁 Running step 5...',
  '[INFO] 🔍 Generated: static/css/styles.css (Styling)',
  '[INFO] 📄 Saved: logger/portfolio/code/static/css/styles.css',
  '[DEBUG] File size: 4.7KB',
  '[DEBUG] Framework: Tailwind CSS',
  '',
  '🔁 Running step 6...',
  '[INFO] 🔍 Generated: requirements.txt (Dependencies)',
  '[INFO] 📄 Saved: logger/portfolio/code/requirements.txt',
  '[DEBUG] Dependencies: Flask==2.3.3, Jinja2==3.1.2',
  '',
  '🔁 Running step 7...',
  '[INFO] 🔍 Generated: README.md (Documentation)',
  '[INFO] 📄 Saved: logger/portfolio/code/README.md',
  '[DEBUG] File size: 2.8KB',
  '',
  '🎉 Build complete. README.md created. Code available at /logger/portfolio',
  '📦 Project structure:',
  '├── main.py',
  '├── routes.py',
  '├── requirements.txt',
  '├── README.md',
  '├── templates/',
  '│   ├── base.html',
  '│   ├── index.html',
  '│   ├── about.html',
  '│   └── contact.html',
  '└── static/',
  '    ├── css/styles.css',
  '    └── js/main.js',
  '',
  '✅ Ready for deployment!',
  '🚀 Deployment options:',
  '  • Heroku: heroku create your-app && git push heroku main',
  '  • Vercel: vercel --prod',
  '  • Railway: railway deploy',
  '',
  '[INFO] Total build time: 2m 34s',
  '[INFO] Files generated: 8',
  '[INFO] Total lines of code: 247',
  '[INFO] Estimated deployment time: 5-10 minutes',
];

const LogsPage: React.FC = () => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    if (isPlaying && currentIndex < fullLogs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, fullLogs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPlaying, speed]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetLogs = () => {
    setDisplayedLogs([]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const skipToEnd = () => {
    setDisplayedLogs(fullLogs);
    setCurrentIndex(fullLogs.length);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-600" />
            <h1 className="text-xl font-bold">Agent Logs</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Speed control */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
              >
                <option value={50}>2x</option>
                <option value={100}>1x</option>
                <option value={200}>0.5x</option>
              </select>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button
                onClick={resetLogs}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                Reset
              </button>
              
              <button
                onClick={skipToEnd}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                Skip to End
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Code</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>Export Logs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg shadow-2xl overflow-hidden">
            <div className="p-6 h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-1">
                {displayedLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-sm leading-relaxed"
                  >
                    <span className={getLogColor(log)}>{log || '\u00A0'}</span>
                  </motion.div>
                ))}
                
                {isPlaying && currentIndex < fullLogs.length && (
                  <div className="font-mono text-sm text-green-400 border-r-2 border-green-400 animate-pulse">
                    <span className="opacity-0">_</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div className="bg-gray-800 px-6 py-3 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  Progress: {displayedLogs.length} / {fullLogs.length} lines
                </div>
                <div className="text-gray-400">
                  Status: {currentIndex >= fullLogs.length ? 'Complete' : isPlaying ? 'Running...' : 'Paused'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getLogColor = (log: string): string => {
  if (log.startsWith('🚀') || log.startsWith('🎉') || log.startsWith('✅')) {
    return 'text-green-400';
  }
  if (log.startsWith('💡') || log.startsWith('>')) {
    return 'text-blue-400';
  }
  if (log.startsWith('🤖') || log.startsWith('🧠')) {
    return 'text-purple-400';
  }
  if (log.startsWith('[INFO]')) {
    return 'text-cyan-400';
  }
  if (log.startsWith('[DEBUG]')) {
    return 'text-gray-400';
  }
  if (log.startsWith('🔁')) {
    return 'text-yellow-400';
  }
  if (log.startsWith('📦') || log.startsWith('├') || log.startsWith('│') || log.startsWith('└')) {
    return 'text-gray-300';
  }
  return 'text-green-400';
};

export default LogsPage;