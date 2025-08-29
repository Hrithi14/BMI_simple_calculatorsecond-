import React, { useEffect, useState } from 'react';
import { BMIResult } from '../App';

interface BMIGaugeProps {
  result: BMIResult;
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ result }) => {
  const [animatedBMI, setAnimatedBMI] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBMI(result.bmi);
    }, 300);
    return () => clearTimeout(timer);
  }, [result.bmi]);

  const getGaugeAngle = (bmi: number) => {
    // Map BMI to angle (0-180 degrees)
    if (bmi < 18.5) return Math.max(0, (bmi / 18.5) * 45); // 0-45 degrees for underweight (blue)
    if (bmi < 25) return 45 + ((bmi - 18.5) / 6.5) * 90; // 45-135 degrees for normal (green)
    if (bmi < 30) return 135 + ((bmi - 25) / 5) * 30; // 135-165 degrees for overweight (orange)
    return Math.min(180, 165 + Math.min((bmi - 30) / 10, 1) * 15); // 165-180 degrees for obese (red)
  };

  const getNeedleColor = (category: string) => {
    switch (category) {
      case 'underweight': return '#60A5FA'; // Light Blue
      case 'normal': return '#10B981'; // Green
      case 'overweight': return '#F97316'; // Orange
      case 'obese': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  const angle = getGaugeAngle(animatedBMI);
  const needleColor = getNeedleColor(result.category);

  return (
    <div className="text-center space-y-6">
      {/* SVG Gauge */}
      <div className="relative">
        <svg width="300" height="200" className="mx-auto">
          {/* Background Arc */}
          <path
            d="M 50 150 A 100 100 0 0 1 250 150"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            className="dark:stroke-gray-600"
          />
          
          {/* Underweight Arc */}
          <path
            d="M 50 150 A 100 100 0 0 1 106 82"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="20"
          />
          
          {/* Normal Arc */}
          <path
            d="M 106 82 A 100 100 0 0 1 194 82"
            fill="none"
            stroke="#10B981"
            strokeWidth="20"
          />
          
          {/* Overweight Arc */}
          <path
            d="M 194 82 A 100 100 0 0 1 226 107"
            fill="none"
            stroke="#F97316"
            strokeWidth="20"
          />
          
          {/* Obese Arc */}
          <path
            d="M 226 107 A 100 100 0 0 1 250 150"
            fill="none"
            stroke="#EF4444"
            strokeWidth="20"
          />
          
          {/* Needle */}
          <g 
            style={{ 
              transform: `rotate(${angle - 90}deg)`, 
              transformOrigin: '150px 150px',
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}
          >
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="70"
              stroke={needleColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="150"
              cy="150"
              r="8"
              fill={needleColor}
            />
          </g>
          
          {/* Labels */}
          <text x="40" y="170" className="text-xs fill-blue-500 dark:fill-blue-400 font-medium" textAnchor="middle">
            Underweight
          </text>
          <text x="100" y="60" className="text-xs fill-green-500 dark:fill-green-400 font-medium" textAnchor="middle">
            Normal
          </text>
          <text x="200" y="60" className="text-xs fill-orange-500 dark:fill-orange-400 font-medium" textAnchor="middle">
            Overweight
          </text>
          <text x="260" y="170" className="text-xs fill-red-500 dark:fill-red-400 font-medium" textAnchor="middle">
            Obese
          </text>
        </svg>
      </div>

      {/* BMI Value Display */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {result.bmi}
        </div>
        <div 
          className="text-lg font-semibold capitalize mb-2"
          style={{ color: needleColor }}
        >
          {result.category}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          BMI Categories: Underweight &lt;18.5 | Normal 18.5-24.9 | Overweight 25-29.9 | Obese ≥30
        </div>
      </div>
    </div>
  );
};

export default BMIGauge;