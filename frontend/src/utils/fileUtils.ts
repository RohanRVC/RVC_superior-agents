import { ProjectFile } from '../api';

/**
 * Determines the programming language based on file extension
 * @param fileName - Name of the file
 * @returns Language identifier for syntax highlighting
 */
export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'py':
      return 'python';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'yml':
    case 'yaml':
      return 'yaml';
    case 'sh':
      return 'bash';
    case 'sql':
      return 'sql';
    case 'go':
      return 'go';
    case 'java':
      return 'java';
    case 'c':
      return 'c';
    case 'cpp':
    case 'cc':
      return 'cpp';
    case 'rb':
      return 'ruby';
    case 'php':
      return 'php';
    case 'rs':
      return 'rust';
    case 'swift':
      return 'swift';
    case 'kt':
      return 'kotlin';
    default:
      return 'text';
  }
};

/**
 * Converts a flat file list to a nested file tree structure
 * @param files - Flat array of file paths
 * @returns Nested file tree structure
 */
export const buildFileTree = (files: string[]): ProjectFile[] => {
  const root: ProjectFile[] = [];
  
  files.forEach(filePath => {
    const parts = filePath.split('/');
    let currentLevel = root;
    
    parts.forEach((part, index) => {
      // Check if we're at the file name (last part)
      const isFile = index === parts.length - 1;
      
      // Look for existing directory/file at current level
      const existingItem = currentLevel.find(item => item.name === part);
      
      if (existingItem) {
        // If it exists and is a directory, move to its children
        if (!isFile && existingItem.type === 'directory') {
          currentLevel = existingItem.children || [];
        }
      } else {
        // Create new item
        const newItem: ProjectFile = {
          name: part,
          path: parts.slice(0, index + 1).join('/'),
          type: isFile ? 'file' : 'directory',
        };
        
        // If it's a directory, initialize children array
        if (!isFile) {
          newItem.children = [];
        }
        
        // Add to current level
        currentLevel.push(newItem);
        
        // If it's a directory, move to its children
        if (!isFile) {
          currentLevel = newItem.children || [];
        }
      }
    });
  });
  
  return root;
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Formats a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};