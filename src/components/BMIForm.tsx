import React from 'react';
import { User, Ruler, Weight, Activity, ToggleLeft, ToggleRight } from 'lucide-react';
import { BMIData } from '../App';

interface BMIFormProps {
  formData: BMIData;
  setFormData: React.Dispatch<React.SetStateAction<BMIData>>;
}

const BMIForm: React.FC<BMIFormProps> = ({ formData, setFormData }) => {
  const updateField = (field: keyof BMIData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Convert height for display in imperial (feet and inches)
  const getHeightDisplay = () => {
    if (formData.unit === 'imperial') {
      const totalInches = formData.height;
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return { feet, inches };
    }
    return { feet: 0, inches: formData.height };
  };

  const updateImperialHeight = (feet: number, inches: number) => {
    const totalInches = feet * 12 + inches;
    updateField('height', totalInches);
  };

  const heightDisplay = getHeightDisplay();
  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex">
          <button
            onClick={() => updateField('unit', 'metric')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              formData.unit === 'metric'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            cm/kg
          </button>
          <button
            onClick={() => updateField('unit', 'imperial')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              formData.unit === 'imperial'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            ft/kg
          </button>
        </div>
      </div>

      {/* Age */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <User className="h-4 w-4" />
          <span>Age (years)</span>
        </label>
        <input
          type="number"
          value={formData.age || ''}
          onChange={(e) => updateField('age', parseInt(e.target.value))}
          placeholder="25"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          min="1"
          max="120"
        />
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <User className="h-4 w-4" />
          <span>Gender</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={(e) => updateField('gender', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Male</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={(e) => updateField('gender', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Female</span>
          </label>
        </div>
      </div>

      {/* Height */}
      {formData.unit === 'metric' ? (
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Ruler className="h-4 w-4" />
            <span>Height (cm)</span>
          </label>
          <input
            type="number"
            value={formData.height || ''}
            onChange={(e) => updateField('height', parseFloat(e.target.value))}
            placeholder="175"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
            min="30"
            max="250"
            step="0.1"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Ruler className="h-4 w-4" />
            <span>Height (feet & inches)</span>
          </label>
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="number"
                value={heightDisplay.feet || ''}
                onChange={(e) => updateImperialHeight(parseInt(e.target.value) || 0, heightDisplay.inches)}
                placeholder="5"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                min="3"
                max="8"
              />
              <label className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">feet</label>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={heightDisplay.inches || ''}
                onChange={(e) => updateImperialHeight(heightDisplay.feet, parseInt(e.target.value) || 0)}
                placeholder="9"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                min="0"
                max="11"
              />
              <label className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">inches</label>
            </div>
          </div>
        </div>
      )}

      {/* Weight */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Weight className="h-4 w-4" />
          <span>Weight (kg)</span>
        </label>
        <input
          type="number"
          value={formData.weight || ''}
          onChange={(e) => updateField('weight', parseFloat(e.target.value))}
          placeholder="70"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
          min="20"
          max="500"
          step="0.1"
        />
      </div>

      {/* Activity Level */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Activity className="h-4 w-4" />
          <span>Activity Level</span>
        </label>
        <select
          value={formData.activityLevel}
          onChange={(e) => updateField('activityLevel', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="sedentary">Sedentary (little to no exercise)</option>
          <option value="light">Light (1-3 days/week)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="active">Active (6-7 days/week)</option>
          <option value="very-active">Very Active (2x/day, intense workouts)</option>
        </select>
      </div>
    </div>
  );
};

export default BMIForm;