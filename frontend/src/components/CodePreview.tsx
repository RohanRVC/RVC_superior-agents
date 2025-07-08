import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodePreviewProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

const CodePreview = ({ 
  code, 
  language = 'javascript', 
  fileName = 'example.js',
  showLineNumbers = true 
}: CodePreviewProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-window w-full">
      <div className="code-header flex justify-between items-center">
        <div className="flex items-center">
          <div className="code-dots mr-4">
            <div className="code-dot code-dot-red"></div>
            <div className="code-dot code-dot-yellow"></div>
            <div className="code-dot code-dot-green"></div>
          </div>
          <span className="text-xs text-gray-400">{fileName}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Copy code"
        >
          {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
        </button>
      </div>
      <div className="code-content overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: '16px',
            background: '#1e1e2e',
            borderRadius: '0 0 8px 8px',
            fontSize: '14px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;