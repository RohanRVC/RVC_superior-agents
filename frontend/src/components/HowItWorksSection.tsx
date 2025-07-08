import React from 'react';
import { MessageSquare, Cpu, Download } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Idea",
    description: "Simply tell AutoFounder what you want to build. Be as detailed or as brief as you like.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Cpu,
    title: "AI Builds Everything",
    description: "Our advanced LLM agents analyze your idea and generate complete, production-ready code.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Download,
    title: "Download & Deploy",
    description: "Get your full project with documentation, ready to deploy or customize further.",
    color: "from-green-500 to-emerald-500"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From concept to code in three simple steps. No technical expertise required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden md:block relative mt-8">
          <div className="absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-600 dark:to-purple-600"></div>
          <div className="absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-green-300 dark:from-purple-600 dark:to-green-600"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;