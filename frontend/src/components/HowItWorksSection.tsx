import React from 'react';
import { MessageSquare, Brain, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: MessageSquare,
    title: 'Describe Your Idea',
    description: 'Simply tell AutoFounder what you want to build. Be as detailed or as brief as you like.',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: Brain,
    title: 'AI Builds Everything',
    description: 'Our LLM agents analyze your idea and generate a complete, production-ready codebase.',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    icon: Download,
    title: 'Download & Deploy',
    description: 'Get your complete project with documentation, ready to deploy and customize.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From idea to code in three simple steps. No technical expertise required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-6`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 transform translate-x-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;