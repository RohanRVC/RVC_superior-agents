import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Terminal from '../components/Terminal';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';

const LogsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    // In a real implementation, fetch logs from backend
    // For now, we'll simulate logs
    const fetchLogs = () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Generate sample logs based on projectId
        const sampleLogs = [
          '🚀 Welcome to AutoFounder OS 💪🏻🤖💖',
          '💡 Processing idea: "Build a personal portfolio website with Flask backend"',
          '🤖 Model selected: OpenRouter (GPT-4)',
          '🧠 Starting AutoBuilder Agent...',
          '[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45',
          '[INFO] 📨 Prompt generated: You are a CTO building the following...',
          '[INFO] ✅ LLM response received, 586 tokens',
          '[INFO] 📄 Generated roadmap: main.py, routes.py, templates/index.html, static/css/styles.css',
          '🔁 Running step 1...',
          '[INFO] 🔍 Generated: main.py (Flask entry point)',
          '[INFO] 📄 Saved: logger/portfolio/code/main.py',
          '🔁 Running step 2...',
          '[INFO] 🔍 Generated: templates/index.html (HTML page)',
          '[INFO] 📄 Saved: logger/portfolio/code/templates/index.html',
          '🎉 Build complete. README.md created. Code available at /logger/portfolio'
        ];
        
        setLogs(sampleLogs);
        setProjectName(projectId || 'Unknown Project');
        setIsLoading(false);
      }, 1000);
    };

    fetchLogs();
    
    // Set up polling for log updates (every 5 seconds)
    const intervalId = setInterval(fetchLogs, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [projectId]);

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real implementation, this would fetch fresh logs
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleDownload = () => {
    // Create a blob with the logs content
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}-logs.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Build Logs: {projectName}</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors duration-200"
              >
                <FiRefreshCw className="mr-2" />
                Refresh
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
              >
                <FiDownload className="mr-2" />
                Download Logs
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <Terminal logs={logs} isLoading={isLoading} />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Logs are updated automatically every 5 seconds. You can also manually refresh.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogsPage;