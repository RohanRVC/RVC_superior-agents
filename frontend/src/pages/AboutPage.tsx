import { motion } from 'framer-motion';
import { FiCpu, FiCode, FiGithub, FiLayers, FiPackage, FiTerminal } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About AutoFounder</h1>
          
          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">What is AutoFounder?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              AutoFounder is an autonomous agent system that transforms a single-line idea prompt into a complete, 
              working codebase. Think of it as a CTO-in-a-box that builds your project step by step, 
              generating all necessary files, code, and documentation.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              Whether you're prototyping a new startup idea, building a side project, or learning a new 
              technology stack, AutoFounder accelerates your development process by handling the initial 
              implementation, allowing you to focus on customization and business logic.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                  <FiCpu className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-medium">Autonomous Agent</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Uses LLMs to reason, plan, and build files one by one with a step-by-step approach.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                  <FiLayers className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-medium">Multi-file Support</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Generates any file type (.py, .html, .css, .js, etc.) with proper folder structure.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                  <FiTerminal className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-medium">Copilot Tracking</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Logs every build step and conversation in JSON format for transparency and debugging.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                  <FiPackage className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-medium">Auto Documentation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Generates a comprehensive README.md with setup instructions, usage examples, and project structure.
              </p>
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          
          <div className="glass-card p-8 mb-12">
            <ol className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    1
                  </div>
                  <div className="h-full w-0.5 bg-primary-600 ml-3.5 -my-2"></div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium">Input Your Idea</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    You provide a single-line description of your project idea, select an LLM model, and choose between demo or continuous mode.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    2
                  </div>
                  <div className="h-full w-0.5 bg-primary-600 ml-3.5 -my-2"></div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium">Roadmap Creation</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    AutoFounder runs "Step 0" to create a roadmap of files to build, planning out the entire project structure.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    3
                  </div>
                  <div className="h-full w-0.5 bg-primary-600 ml-3.5 -my-2"></div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium">File Generation</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    The agent builds each file in a separate step, ensuring proper dependencies and connections between components.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    4
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium">Documentation & Delivery</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Once all files are generated, AutoFounder creates a README.md file and organizes everything in the logger directory for easy access.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Architecture</h2>
          
          <div className="glass-card p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Core Components</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>BuilderAgent</strong> – Core agent logic that manages the build process</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>PromptGenerator</strong> – Creates prompts for each build step</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>Genner</strong> – LLM wrapper supporting multiple models</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>SQLiteDB</strong> – Stores chat history and build progress</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>Logger</strong> – Writes code files, summaries, and file maps</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Tech Stack</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>Python 3.10+</strong> – Core backend language</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>SQLite</strong> – For step tracking and persistence</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>React + Tailwind</strong> – Frontend UI</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>Docker</strong> – Containerization</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                    <span><strong>LLM APIs</strong> – OpenAI, Claude, OpenRouter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="https://github.com/SuperiorAgents/superior-agents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FiGithub className="mr-2" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;