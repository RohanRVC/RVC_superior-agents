import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/SuperiorAgents/superior-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">GitHub</span>
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Twitter</span>
              <FiTwitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Email</span>
              <FiMail className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} AutoFounder OS. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </Link>
              <Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400">
                About
              </Link>
              <Link to="/build" className="hover:text-primary-600 dark:hover:text-primary-400">
                Build
              </Link>
              <Link to="/projects" className="hover:text-primary-600 dark:hover:text-primary-400">
                Projects
              </Link>
              <Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400">
                Contact
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by AI Agents
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;