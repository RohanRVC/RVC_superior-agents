import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiKey } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface BuildFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

interface FormData {
  idea: string;
  model: 'openai' | 'claude' | 'openrouter';
  mode: 'demo' | 'continuous';
  apiKey: string;
}

const BuildForm = ({ onSubmit, isLoading }: BuildFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    idea: '',
    model: 'openrouter',
    mode: 'demo',
    apiKey: '',
  });

  const [showApiKey, setShowApiKey] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModelChange = (model: FormData['model']) => {
    setFormData(prev => ({ ...prev, model }));
    setShowApiKey(model !== 'openrouter');
  };

  const handleModeChange = (mode: FormData['mode']) => {
    setFormData(prev => ({ ...prev, mode }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.idea.trim()) {
      alert('Please enter your startup idea');
      return;
    }
    
    if (showApiKey && !formData.apiKey.trim()) {
      alert('Please enter your API key');
      return;
    }
    
    try {
      onSubmit(formData);
      
      // In a real implementation, you would call your backend here
      // For now, we'll simulate a successful build and redirect to logs
      const projectId = 'demo-' + Date.now();
      
      // Redirect to logs page after submission
      setTimeout(() => {
        navigate(`/logs/${projectId}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Build Your Project</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Idea Input */}
        <div>
          <label htmlFor="idea" className="block text-sm font-medium mb-2">
            Your Startup Idea
          </label>
          <textarea
            id="idea"
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            placeholder="Describe your startup idea or project (e.g., 'Build a job board web app with Flask backend and responsive HTML/CSS frontend')"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            rows={4}
            required
          />
        </div>
        
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select LLM Model
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => handleModelChange('openai')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.model === 'openai'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              <FiCode className="h-5 w-5 mr-2" />
              <span>OpenAI</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleModelChange('claude')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.model === 'claude'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              <FiCpu className="h-5 w-5 mr-2" />
              <span>Claude</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleModelChange('openrouter')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.model === 'openrouter'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              <FiCpu className="h-5 w-5 mr-2" />
              <span>OpenRouter</span>
            </button>
          </div>
        </div>
        
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Run Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleModeChange('demo')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.mode === 'demo'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              <span>Demo Mode</span>
              <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                3 steps
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleModeChange('continuous')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                formData.mode === 'continuous'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100'
              }`}
            >
              <span>Continuous Mode</span>
              <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                Full build
              </span>
            </button>
          </div>
        </div>
        
        {/* API Key Input (conditionally shown) */}
        {showApiKey && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
              API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleChange}
                placeholder={`Enter your ${formData.model === 'openai' ? 'OpenAI' : 'Claude'} API key`}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Your API key is only used for this request and not stored.
            </p>
          </motion.div>
        )}
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Building...' : 'Start Building'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BuildForm;