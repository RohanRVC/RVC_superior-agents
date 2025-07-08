import React from 'react';
import { ArrowLeft, Download, Eye, RotateCcw, Share, Folder, File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    name: 'Personal Portfolio',
    description: 'Flask-based portfolio website with responsive design',
    createdAt: '2025-01-07 19:15:23',
    files: [
      { name: 'main.py', type: 'file', size: '2.1KB' },
      { name: 'routes.py', type: 'file', size: '1.8KB' },
      { name: 'requirements.txt', type: 'file', size: '0.2KB' },
      { name: 'README.md', type: 'file', size: '2.8KB' },
      { name: 'templates/', type: 'folder', children: [
        { name: 'base.html', type: 'file', size: '1.5KB' },
        { name: 'index.html', type: 'file', size: '3.2KB' },
        { name: 'about.html', type: 'file', size: '2.1KB' },
        { name: 'contact.html', type: 'file', size: '1.9KB' },
      ]},
      { name: 'static/', type: 'folder', children: [
        { name: 'css/styles.css', type: 'file', size: '4.7KB' },
        { name: 'js/main.js', type: 'file', size: '1.2KB' },
      ]},
    ],
    totalFiles: 8,
    totalSize: '19.3KB',
    status: 'completed',
  },
  {
    id: 2,
    name: 'SaaS Dashboard',
    description: 'Full-stack dashboard with user authentication and analytics',
    createdAt: '2025-01-06 14:32:10',
    files: [
      { name: 'app.py', type: 'file', size: '3.4KB' },
      { name: 'models.py', type: 'file', size: '2.7KB' },
      { name: 'auth.py', type: 'file', size: '1.9KB' },
      { name: 'requirements.txt', type: 'file', size: '0.3KB' },
      { name: 'README.md', type: 'file', size: '3.1KB' },
    ],
    totalFiles: 12,
    totalSize: '45.7KB',
    status: 'completed',
  },
  {
    id: 3,
    name: 'E-commerce API',
    description: 'RESTful API with payment integration and inventory management',
    createdAt: '2025-01-05 09:18:45',
    files: [
      { name: 'server.js', type: 'file', size: '4.2KB' },
      { name: 'package.json', type: 'file', size: '0.8KB' },
      { name: 'README.md', type: 'file', size: '4.1KB' },
    ],
    totalFiles: 15,
    totalSize: '67.2KB',
    status: 'completed',
  },
];

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Projects</h1>
          </div>
        </div>

        {selectedProject ? (
          /* Project Detail View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Project header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex items-center space-x-2 text-blue-100 hover:text-white mb-4 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Projects</span>
                    </button>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.name}</h2>
                    <p className="text-blue-100 mb-4">{selectedProject.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-blue-100">
                      <span>Created: {selectedProject.createdAt}</span>
                      <span>•</span>
                      <span>{selectedProject.totalFiles} files</span>
                      <span>•</span>
                      <span>{selectedProject.totalSize}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download ZIP</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 p-6">
                {/* File tree */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Files</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <FileTree files={selectedProject.files} />
                  </div>
                </div>

                {/* README preview */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">README.md</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-none">
                      <h1>{selectedProject.name}</h1>
                      <p>{selectedProject.description}</p>
                      <h2>Installation</h2>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded">
                        <code>{`pip install -r requirements.txt
python main.py`}</code>
                      </pre>
                      <h2>Features</h2>
                      <ul>
                        <li>Responsive design</li>
                        <li>Modern UI/UX</li>
                        <li>Production ready</li>
                        <li>Well documented</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Live Demo</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                      <RotateCcw className="h-4 w-4" />
                      <span>Re-run Agent</span>
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last modified: {selectedProject.createdAt}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Projects Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{project.totalFiles} files</span>
                    <span>{project.totalSize}</span>
                  </div>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                    Created: {project.createdAt}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FileTree: React.FC<{ files: any[]; level?: number }> = ({ files, level = 0 }) => {
  return (
    <div className="space-y-1">
      {files.map((file, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm" style={{ paddingLeft: `${level * 16}px` }}>
          {file.type === 'folder' ? (
            <>
              <Folder className="h-4 w-4 text-blue-500" />
              <span className="text-gray-900 dark:text-white font-medium">{file.name}</span>
              {file.children && (
                <div className="mt-1">
                  <FileTree files={file.children} level={level + 1} />
                </div>
              )}
            </>
          ) : (
            <>
              <File className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
              <span className="text-gray-400 text-xs ml-auto">{file.size}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;