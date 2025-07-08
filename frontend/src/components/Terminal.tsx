import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  logs: string[];
  isLoading?: boolean;
}

const Terminal = ({ logs, isLoading = false }: TerminalProps) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length === 0) return;

    // Simulate typing effect for logs
    const showNextLog = (index: number) => {
      if (index >= logs.length) return;
      
      setVisibleLogs(prev => [...prev, logs[index]]);
      
      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
      
      // Show next log after delay
      const delay = Math.random() * 500 + 100; // Random delay between 100-600ms
      setTimeout(() => showNextLog(index + 1), delay);
    };

    // Start showing logs
    showNextLog(visibleLogs.length);
  }, [logs]);

  // Format log line with appropriate color class
  const formatLog = (log: string) => {
    if (log.includes('[INFO]') || log.includes('🔍')) {
      return <span className="terminal-info">{log}</span>;
    } else if (log.includes('[ERROR]') || log.includes('❌')) {
      return <span className="terminal-error">{log}</span>;
    } else if (log.includes('[WARNING]') || log.includes('⚠️')) {
      return <span className="terminal-warning">{log}</span>;
    } else if (log.includes('✅') || log.includes('🎉')) {
      return <span className="terminal-success">{log}</span>;
    } else {
      return <span>{log}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="code-window w-full h-full"
    >
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot code-dot-red"></div>
          <div className="code-dot code-dot-yellow"></div>
          <div className="code-dot code-dot-green"></div>
        </div>
        <div className="text-xs text-gray-400">autofounder-terminal</div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      <div 
        ref={terminalRef}
        className="code-content h-[500px] overflow-y-auto font-mono text-sm"
      >
        {visibleLogs.map((log, index) => (
          <div key={index} className="mb-1">
            {formatLog(log)}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center">
            <span className="animate-pulse mr-2">▋</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;