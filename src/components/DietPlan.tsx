import React from 'react';
import { Apple, Activity, Heart, Clock, Target, AlertCircle } from 'lucide-react';
import { BMIResult, BMIData } from '../App';

interface DietPlanProps {
  result: BMIResult;
  formData: BMIData;
}

const DietPlan: React.FC<DietPlanProps> = ({ result, formData }) => {
  const getDietRecommendations = () => {
    const baseRecommendations = [
      {
        icon: <Apple className="h-5 w-5" />,
        title: "Eat a Balanced Diet",
        content: "Include plenty of fruits, vegetables, legumes, nuts and whole grains. WHO recommends at least 400g (roughly 5 servings) of fruits and vegetables daily."
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: "Limit Added Sugars",
        content: "Keep free sugars under 10% of total calories (about 6 teaspoons per day). Choose natural sweeteners when possible."
      },
      {
        icon: <Heart className="h-5 w-5" />,
        title: "Choose Healthy Fats",
        content: "Restrict total fat to less than 30% of energy intake. Prefer unsaturated fats (olive oil, fish, nuts) and avoid trans/saturated fats."
      },
      {
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Reduce Salt Intake",
        content: "Aim for less than 5g of salt per day to help control blood pressure and reduce cardiovascular risk."
      }
    ];

    const categorySpecific = [];

    if (result.category === 'underweight') {
      categorySpecific.push({
        icon: <Target className="h-5 w-5" />,
        title: "Increase Caloric Intake",
        content: "Focus on nutrient-dense, calorie-rich foods. Include healthy fats, lean proteins, and complex carbohydrates. Consider eating more frequent, smaller meals."
      });
    } else if (result.category === 'overweight' || result.category === 'obese') {
      categorySpecific.push({
        icon: <Target className="h-5 w-5" />,
        title: "Create Caloric Deficit",
        content: "Reduce portion sizes gradually and focus on low-calorie, nutrient-dense foods. Increase fiber intake to improve satiety."
      });
    }

    return [...baseRecommendations, ...categorySpecific];
  };

  const getExerciseRecommendations = () => {
    const ageGroup = formData.age < 65 ? 'adult' : 'senior';
    
    return {
      cardio: ageGroup === 'adult' 
        ? "150-300 minutes of moderate aerobic activity per week (like brisk walking or cycling)"
        : "150 minutes of moderate aerobic activity per week, adjusted for mobility",
      strength: ageGroup === 'adult'
        ? "Muscle-strengthening activities on 2 or more days per week"
        : "Light resistance exercises 2-3 times per week to maintain muscle mass",
      intensity: result.category === 'obese' 
        ? "Start with low-impact activities and gradually increase intensity"
        : "Maintain consistent activity level based on current fitness"
    };
  };

  const dietRecommendations = getDietRecommendations();
  const exerciseRecs = getExerciseRecommendations();

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Personalized Health Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Based on WHO guidelines and your BMI category: <span className="font-semibold capitalize text-blue-600 dark:text-blue-400">{result.category}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Diet Recommendations */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Apple className="h-6 w-6 text-green-600" />
            <span>Nutrition Guidelines</span>
          </h3>
          
          <div className="space-y-4">
            {dietRecommendations.map((rec, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    {rec.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {rec.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Recommendations */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span>Exercise Guidelines</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Cardiovascular Exercise
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exerciseRecs.cardio}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Strength Training
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exerciseRecs.strength}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Activity Level Guidance
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exerciseRecs.intensity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Important Note
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              These recommendations are based on WHO guidelines and your BMI category. For personalized advice, 
              especially if you have existing health conditions, please consult with a healthcare professional 
              or registered dietitian.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;