import React from 'react';
import { ArrowRight, Play, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">Launch your startup idea</span>
            <br />
            <span className="text-gray-900 dark:text-white">with one prompt</span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            AutoFounder builds your entire project codebase from scratch using LLMs
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>Start Building</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group glass-morphism text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 hover:shadow-lg transform hover:-translate-y-1">
              <Play className="h-5 w-5" />
              <span>See Demo</span>
            </button>
          </motion.div>

          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass-morphism rounded-xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Code2 className="h-4 w-4" />
                  <span className="text-sm font-mono">AutoFounder Output</span>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 text-left overflow-hidden">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`🚀 Welcome to AutoFounder OS 💪🏻🤖💖
💡 What's your startup idea?
> Build a personal portfolio website with Flask backend

🤖 Model selected: OpenRouter (GPT-4)

🧠 Starting AutoBuilder Agent...
[INFO 19:12:45] 🧠 Starting Step 0 at 2025-07-07 19:12:45
[INFO] 📨 Prompt generated: You are a CTO building the following...
[INFO] ✅ LLM response received, 586 tokens
[INFO] 📄 Generated roadmap: main.py, routes.py, templates/index.html

🔁 Running step 1...
[INFO] 🔍 Generated: main.py (Flask entry point)
[INFO] 📄 Saved: logger/portfolio/code/main.py

🎉 Build complete. README.md created.`}
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;