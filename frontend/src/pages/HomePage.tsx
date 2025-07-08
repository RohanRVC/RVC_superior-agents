import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiCpu, FiLayers } from 'react-icons/fi';
import CodePreview from '../components/CodePreview';

const HomePage = () => {
  // Sample code for the preview
  const sampleCode = `# main.py - Flask entry point
from flask import Flask, render_template
from routes import register_routes

app = Flask(__name__)
register_routes(app)

@app.route('/')
def index():
    return render_template('index.html', title="My Portfolio")

if __name__ == '__main__':
    app.run(debug=True)`;

  return (
    <div className="relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="block">Turn Your Idea Into</span>
              <span className="block mt-2 gradient-text">Code. Instantly.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              AutoFounder helps you build complete projects from just a single idea using AI agents.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/build"
                className="px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Start Building
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100 text-gray-900 dark:text-white font-medium transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <CodePreview 
              code={sampleCode} 
              language="python" 
              fileName="main.py" 
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              AutoFounder uses AI agents to transform your idea into a complete, working codebase in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Idea</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter a brief description of your project or startup idea. Be as specific or general as you like.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Builds Your Project</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI agent analyzes your idea, creates a roadmap, and generates all necessary code files.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & Use</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get a complete, working codebase with documentation. Ready to run, modify, or extend.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose AutoFounder?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for developers who want to move fast and build complete projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <FiCode className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-File Projects</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generates complete projects with multiple files, proper folder structure, and documentation.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <FiCpu className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LLM-Powered</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Uses state-of-the-art language models to understand your requirements and generate high-quality code.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <FiLayers className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full-Stack Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Handles frontend, backend, databases, and more. Build complete applications with a single prompt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Build Your Next Project?</h2>
          <Link
            to="/build"
            className="inline-block px-8 py-3 rounded-lg bg-white text-primary-600 font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;