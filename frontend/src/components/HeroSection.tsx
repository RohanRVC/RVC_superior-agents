import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Powered by Advanced LLMs
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Launch your startup idea
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              with one prompt
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-slide-up delay-200">
            AutoFounder builds your entire project codebase from scratch using LLMs.
            From idea to deployment in minutes, not months.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-300">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center space-x-2">
                <span>Start Building</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl">
              <span className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>See Demo</span>
              </span>
            </button>
          </div>

          {/* Code Preview */}
          <div className="max-w-4xl mx-auto animate-slide-up delay-500">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  AutoFounder Terminal
                </span>
                <div className="w-16"></div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2 text-left">
                  <div className="text-green-400">$ autofounder build</div>
                  <div className="text-blue-400">🚀 Welcome to AutoFounder OS</div>
                  <div className="text-gray-600 dark:text-gray-400">💡 What's your startup idea?</div>
                  <div className="text-white dark:text-gray-200">> Build a personal portfolio website with Flask backend</div>
                  <div className="text-yellow-400">🤖 Model selected: OpenRouter (GPT-4)</div>
                  <div className="text-purple-400">🧠 Starting AutoBuilder Agent...</div>
                  <div className="text-gray-500">[INFO] ✅ LLM response received, 586 tokens</div>
                  <div className="text-gray-500">[INFO] 📄 Generated roadmap: main.py, routes.py, templates/index.html</div>
                  <div className="text-green-400">🎉 Build complete. README.md created.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;