import { useState } from 'react';
import { FiFolder, FiFolderPlus, FiFile, FiChevronRight, FiChevronDown } from 'react-icons/fi';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  onFileClick: (path: string) => void;
  selectedFile?: string;
}

const FileTreeItem = ({ 
  node, 
  depth = 0, 
  onFileClick, 
  selectedFile 
}: { 
  node: FileNode; 
  depth?: number; 
  onFileClick: (path: string) => void; 
  selectedFile?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = node.type === 'directory';
  const isSelected = selectedFile === node.path;

  const toggleOpen = () => {
    if (isDirectory) {
      setIsOpen(!isOpen);
    }
  };

  const handleFileClick = () => {
    if (!isDirectory) {
      onFileClick(node.path);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center py-1 px-2 rounded-md cursor-pointer ${
          isSelected 
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
            : 'hover:bg-gray-100 dark:hover:bg-dark-100'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={isDirectory ? toggleOpen : handleFileClick}
      >
        {isDirectory ? (
          <>
            <span className="mr-1">
              {isOpen ? <FiChevronDown className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
            </span>
            {isOpen ? (
              <FiFolderPlus className="h-4 w-4 text-yellow-400 mr-2" />
            ) : (
              <FiFolder className="h-4 w-4 text-yellow-400 mr-2" />
            )}
          </>
        ) : (
          <FiFile className="h-4 w-4 text-gray-400 ml-5 mr-2" />
        )}
        <span className="text-sm truncate">{node.name}</span>
      </div>
      
      {isDirectory && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeItem 
              key={index} 
              node={child} 
              depth={depth + 1} 
              onFileClick={onFileClick}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree = ({ files, onFileClick, selectedFile }: FileTreeProps) => {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-800 p-4 h-full overflow-auto">
      <h3 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Project Files</h3>
      <div className="space-y-1">
        {files.map((file, index) => (
          <FileTreeItem 
            key={index} 
            node={file} 
            onFileClick={onFileClick}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileTree;