import React from 'react';
import { ArrowLeft, Download, Eye, RefreshCw, Share, Folder, File } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockProjects = [
  {
    id: 1,
    name: 'Personal Portfolio',
    description: 'Flask backend with responsive frontend',
    createdAt: '2025-01-08',
    files: [
      { name: 'main.py', type: 'file', size: '2.1 KB' },
      { name: 'routes.py', type: 'file', size: '1.8 KB' },
      { name: 'templates/', type: 'folder', children: [
        { name: 'index.html', type: 'file', size: '3.2 KB' },
        { name: 'about.html', type: 'file', size: '2.1 KB' }
      ]},
      { name: 'static/', type: 'folder', children: [
        { name: 'css/', type: 'folder', children: [
          { name: 'styles.css', type: 'file', size: '4.5 KB' }
        ]},
        { name: 'js/', type: 'folder', children: [
          { name: 'main.js', type: 'file', size: '1.2 KB' }
        ]}
      ]},
      { name: 'README.md', type: 'file', size: '1.5 KB' }
    ],
    status: 'completed'
  },
  {
    id: 2,
    name: 'E-commerce API',
    description: 'REST API with authentication and payment processing',
    createdAt: '2025-01-07',
    files: [
      { name: 'app.py', type: 'file', size: '3.2 KB' },
      { name: 'models.py', type: 'file', size: '2.8 KB' },
      { name: 'auth.py', type: 'file', size: '1.9 KB' },
      { name: 'requirements.txt', type: 'file', size: '0.5 KB' },
      { name: 'README.md', type: 'file', size: '2.1 KB' }
    ],
    status: 'completed'
  }
];

const FileTreeItem: React.FC<{ item: any; depth?: number }> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(depth < 2);

  return (
    <div>
      <div 
        className={`flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => item.type === 'folder' && setIsOpen(!isOpen)}
      >
        {item.type === 'folder' ? (
          <Folder className={`h-4 w-4 ${isOpen ? 'text-blue-500' : 'text-gray-500'}`} />
        ) : (
          <File className="h-4 w-4 text-gray-500" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {item.name}
        </span>
        {item.size && (
          <span className="text-xs text-gray-500 ml-auto">
            {item.size}
          </span>
        )}
      </div>
      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child: any, index: number) => (
            <FileTreeItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid gap-8">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Created: {project.createdAt}</span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="capitalize">{project.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* File Tree */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Project Structure
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-64 overflow-y-auto">
                    {project.files.map((file, index) => (
                      <FileTreeItem key={index} item={file} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    README Preview
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-64 overflow-y-auto">
                    <div className="prose prose-sm dark:prose-invert">
                      <h1>Personal Portfolio</h1>
                      <p>A modern, responsive personal portfolio website built with Flask.</p>
                      <h2>Features</h2>
                      <ul>
                        <li>Responsive design</li>
                        <li>Contact form</li>
                        <li>Project showcase</li>
                        <li>Blog section</li>
                      </ul>
                      <h2>Installation</h2>
                      <pre><code>pip install -r requirements.txt
python main.py</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <RefreshCw className="h-4 w-4" />
                      <span>Re-run Agent</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {project.files.length} files generated
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start building your first project with AutoFounder
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <span>Start Building</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;