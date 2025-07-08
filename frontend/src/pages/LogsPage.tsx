import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Copy, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockLogs = [
  { timestamp: '19:12:45', level: 'INFO', message: '🧠 Starting Step 0 at 2025-07-07 19:12:45' },
  { timestamp: '19:12:46', level: 'INFO', message: '📨 Prompt generated: You are a CTO building the following...' },
  { timestamp: '19:12:48', level: 'INFO', message: '✅ LLM response received, 586 tokens' },
  { timestamp: '19:12:48', level: 'INFO', message: '📄 Generated roadmap: main.py, routes.py, templates/index.html, static/css/styles.css' },
  { timestamp: '19:12:49', level: 'INFO', message: '🔁 Running step 1...' },
  { timestamp: '19:12:50', level: 'INFO', message: '🔍 Generated: main.py (Flask entry point)' },
  { timestamp: '19:12:50', level: 'INFO', message: '📄 Saved: logger/portfolio/code/main.py' },
  { timestamp: '19:12:51', level: 'INFO', message: '🔁 Running step 2...' },
  { timestamp: '19:12:52', level: 'INFO', message: '🔍 Generated: templates/index.html (HTML page)' },
  { timestamp: '19:12:52', level: 'INFO', message: '📄 Saved: logger/portfolio/code/templates/index.html' },
  { timestamp: '19:12:53', level: 'INFO', message: '🔁 Running step 3...' },
  { timestamp: '19:12:54', level: 'INFO', message: '🔍 Generated: static/css/styles.css (Styling)' },
  { timestamp: '19:12:54', level: 'INFO', message: '📄 Saved: logger/portfolio/code/static/css/styles.css' },
  { timestamp: '19:12:55', level: 'SUCCESS', message: '🎉 Build complete. README.md created. Code available at /logger/portfolio' },
];

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<typeof mockLogs>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time logs
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[index]]);
        index++;
      } else {
        setIsLive(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyLogs = () => {
    const logText = logs.map(log => `[${log.timestamp}] ${log.level}: ${log.message}`).join('\n');
    navigator.clipboard.writeText(logText);
  };

  const downloadLogs = () => {
    const logText = logs.map(log => `[${log.timestamp}] ${log.level}: ${log.message}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autofounder-logs.txt';
    a.click();
    URL.revokeObjectURL(url);
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
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-blue-400" />
              <h1 className="text-xl font-semibold">Agent Logs</h1>
              {isLive && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={copyLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={downloadLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-black rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-6 font-mono text-sm space-y-1 h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 animate-fade-in ${
                  log.level === 'SUCCESS' ? 'text-green-400' :
                  log.level === 'ERROR' ? 'text-red-400' :
                  log.level === 'WARN' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}
              >
                <span className="text-gray-500 text-xs mt-0.5 w-20 flex-shrink-0">
                  [{log.timestamp}]
                </span>
                <span className={`text-xs mt-0.5 w-16 flex-shrink-0 ${
                  log.level === 'SUCCESS' ? 'text-green-400' :
                  log.level === 'ERROR' ? 'text-red-400' :
                  log.level === 'WARN' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {log.level}:
                </span>
                <span className="flex-1">{log.message}</span>
              </div>
            ))}
            {isLive && (
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 text-xs w-20 flex-shrink-0">[{new Date().toLocaleTimeString()}]</span>
                <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
            Download Code
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors border border-gray-600">
            Export Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;