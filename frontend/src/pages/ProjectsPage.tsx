import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { FiSearch } from 'react-icons/fi';

// Mock project data
const mockProjects = [
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    description: 'A personal portfolio website with Flask backend and responsive HTML/CSS frontend',
    fileCount: 8,
    createdAt: '2025-07-05T14:30:00Z',
  },
  {
    id: 'todo-app',
    name: 'Todo App',
    description: 'A simple todo application with React frontend and Express backend',
    fileCount: 12,
    createdAt: '2025-07-03T10:15:00Z',
  },
  {
    id: 'weather-dashboard',
    name: 'Weather Dashboard',
    description: 'A weather dashboard that fetches data from OpenWeatherMap API',
    fileCount: 6,
    createdAt: '2025-07-01T16:45:00Z',
  },
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description: 'A full-featured blog platform with user authentication and markdown support',
    fileCount: 15,
    createdAt: '2025-06-28T09:20:00Z',
  },
  {
    id: 'e-commerce-site',
    name: 'E-commerce Site',
    description: 'An e-commerce website with product listings, cart functionality, and checkout process',
    fileCount: 20,
    createdAt: '2025-06-25T11:10:00Z',
  },
  {
    id: 'chat-application',
    name: 'Chat Application',
    description: 'A real-time chat application using WebSockets and React',
    fileCount: 10,
    createdAt: '2025-06-20T13:40:00Z',
  },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch projects
    const fetchProjects = async () => {
      setIsLoading(true);
      
      // In a real implementation, fetch from backend
      // For now, use mock data with a delay
      setTimeout(() => {
        setProjects(mockProjects);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Your Projects</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse and manage all your AutoFounder projects.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          // Projects grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  fileCount={project.fileCount}
                  createdAt={project.createdAt}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // No results state
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;