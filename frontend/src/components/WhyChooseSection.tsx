import React from 'react';
import { Zap, Layers, Brain, FileCode } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete projects in minutes, not weeks. Skip the boilerplate and focus on what matters.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Layers,
    title: "Full-Stack Ready",
    description: "Frontend, backend, database, and deployment configs. Everything you need for a complete application.",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: Brain,
    title: "LLM Powered",
    description: "Leveraging the latest AI models to understand context and generate intelligent, maintainable code.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: FileCode,
    title: "Multi-File Output",
    description: "Organized project structure with proper file separation, documentation, and best practices.",
    color: "from-green-400 to-emerald-500"
  }
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose AutoFounder?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built for developers, by developers. Experience the future of rapid prototyping.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Projects Built" },
            { number: "50+", label: "Frameworks Supported" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "AI Availability" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;