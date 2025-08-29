import React from 'react';
import { X, Eye } from 'lucide-react';
import { BMIResult } from '../App';

interface ResultModalProps {
  result: BMIResult;
  onClose: () => void;
  onViewPlan: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose, onViewPlan }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-start mb-6">
          <div className="text-6xl">{result.emoji}</div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your BMI Result
          </h2>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {result.bmi}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {result.message}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onViewPlan}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>View Detailed Plan</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;