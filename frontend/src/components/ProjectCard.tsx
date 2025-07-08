import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFolder, FiCode, FiClock } from 'react-icons/fi';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  createdAt: string;
}

const ProjectCard = ({ id, name, description, fileCount, createdAt }: ProjectCardProps) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="glass-card overflow-hidden"
    >
      <Link to={`/projects/${id}`} className="block h-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FiFolder className="h-6 w-6 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <FiCode className="mr-1" />
              <span>{fileCount} files</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;