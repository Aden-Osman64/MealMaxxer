const ResultsSection = ({ mealPlan }) => {
  const { totalCalories, macros, meals } = mealPlan

  return (
    <div className="max-w-6xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {totalCalories.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Calories</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {macros.protein}g
          </div>
          <div className="text-sm text-gray-600">Protein</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {macros.carbs}g
          </div>
          <div className="text-sm text-gray-600">Carbs</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {macros.fats}g
          </div>
          <div className="text-sm text-gray-600">Fats</div>
        </div>
      </div>

      {/* Macro Breakdown Chart */}
      <div className="card mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Macro Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Protein</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(macros.protein * 4 / totalCalories) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {Math.round((macros.protein * 4 / totalCalories) * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">Carbs</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(macros.carbs * 4 / totalCalories) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {Math.round((macros.carbs * 4 / totalCalories) * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="font-medium">Fats</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(macros.fats * 9 / totalCalories) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {Math.round((macros.fats * 9 / totalCalories) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Meal Plan */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Daily Meal Plan</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {meals.map((meal, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-shadow">
              {meal.image && (
                <div className="mb-4">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{meal.name}</h4>
                  <p className="text-sm text-primary-600 font-medium">{meal.time}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{meal.calories}</div>
                  <div className="text-xs text-gray-500">calories</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-600">{meal.protein}g</div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-green-600">{meal.carbs}g</div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-yellow-600">{meal.fats}g</div>
                  <div className="text-xs text-gray-500">Fats</div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultsSection 