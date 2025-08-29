import React, { useState, useEffect } from 'react';
import { Moon, Sun, Calculator, Share2, RotateCcw } from 'lucide-react';
import BMIForm from './components/BMIForm';
import BMIGauge from './components/BMIGauge';
import ResultModal from './components/ResultModal';
import DietPlan from './components/DietPlan';
import SocialShare from './components/SocialShare';

export interface BMIData {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  unit: 'metric' | 'imperial';
}

export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  message: string;
  emoji: string;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<BMIData>({
    age: 0,
    gender: 'male',
    height: 0,
    weight: 0,
    activityLevel: 'moderate',
    unit: 'metric'
  });
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDietPlan, setShowDietPlan] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Check system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const calculateBMI = (data: BMIData): BMIResult => {
    let { height, weight, unit } = data;
    
    // Convert to metric if needed
    if (unit === 'imperial') {
      height = height * 2.54; // inches to cm (height is already in total inches)
      // weight is already in kg, no conversion needed
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category: BMIResult['category'];
    let message: string;
    let emoji: string;

    if (bmi < 18.5) {
      category = 'underweight';
      message = "You're underweight. Consider consulting a healthcare provider.";
      emoji = '😟';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'normal';
      message = "Great! You're in the healthy weight range.";
      emoji = '😊';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'overweight';
      message = "You're overweight. Small lifestyle changes can help.";
      emoji = '😐';
    } else {
      category = 'obese';
      message = "You're in the obesity range. Consider professional guidance.";
      emoji = '😟';
    }

    return { bmi: Math.round(bmi * 10) / 10, category, message, emoji };
  };

  const handleCalculate = () => {
    const bmiResult = calculateBMI(formData);
    setResult(bmiResult);
    setShowModal(true);
  };

  const handleReset = () => {
    setFormData({
      age: 0,
      gender: 'male',
      height: 0,
      weight: 0,
      activityLevel: 'moderate',
      unit: 'metric'
    });
    setResult(null);
    setShowModal(false);
    setShowDietPlan(false);
  };

  const handleViewPlan = () => {
    setShowModal(false);
    setShowDietPlan(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                BMI Calculator
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <SocialShare result={result} />
              <div className="relative">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                  aria-label="Toggle dark mode"
                >
                  <div className="relative w-5 h-5">
                    <Sun 
                      className={`absolute inset-0 h-5 w-5 text-yellow-500 transition-all duration-300 ${
                        darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                      }`} 
                    />
                    <Moon 
                      className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-300 ${
                        darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                      }`} 
                    />
                  </div>
                </button>
                
                {/* Toggle indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                    darkMode ? 'bg-blue-400' : 'bg-yellow-500'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Calculate Your BMI
              </h2>
              <BMIForm 
                formData={formData} 
                setFormData={setFormData} 
              />
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Calculate BMI
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200"
                  aria-label="Reset form"
                >
                  <RotateCcw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {result && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Your BMI Result
                </h2>
                <BMIGauge result={result} />
              </div>
            )}
          </div>
        </div>

        {/* Diet Plan Section */}
        {showDietPlan && result && (
          <div className="mt-8">
            <DietPlan result={result} formData={formData} />
          </div>
        )}
      </main>

      {/* Result Modal */}
      {showModal && result && (
        <ResultModal 
          result={result}
          onClose={() => setShowModal(false)}
          onViewPlan={handleViewPlan}
        />
      )}
    </div>
  );
}

export default App;