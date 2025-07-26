import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

const OnHandIngredients = () => {
  const [ingredients, setIngredients] = useState([''])
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleIngredientChange = (idx, value) => {
    const newIngredients = [...ingredients]
    newIngredients[idx] = value
    setIngredients(newIngredients)
  }

  const addIngredientField = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredientField = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMeals([])
    try {
      // Use the first ingredient for demo (TheMealDB free API only supports one at a time)
      const mainIngredient = ingredients.find(ing => ing.trim())
      if (!mainIngredient) {
        setError('Please enter at least one ingredient.')
        setIsLoading(false)
        return
      }
      const url = `${BASE_URL}filter.php?i=${encodeURIComponent(mainIngredient.trim())}`
      const res = await fetch(url)
      const data = await res.json()
      if (!data.meals) {
        setError('No meals found with those ingredients.')
        setIsLoading(false)
        return
      }
      // Fetch details for up to 4 meals
      const mealDetails = await Promise.all(
        data.meals.slice(0, 4).map(async (meal) => {
          const detailsRes = await fetch(`${BASE_URL}lookup.php?i=${meal.idMeal}`)
          const detailsData = await detailsRes.json()
          return detailsData.meals ? detailsData.meals[0] : null
        })
      )
      setMeals(mealDetails.filter(Boolean))
    } catch (err) {
      setError('An error occurred while fetching meals.')
    }
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen">
      <button
        className="fixed top-6 left-6 z-50 btn-primary text-lg px-8 py-3 shadow-lg"
        onClick={() => navigate('/')}
        style={{ minWidth: 120 }}
      >
        ⬅ Home
      </button>
      <div className="max-w-2xl mx-auto card mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Generate Meals From Ingredients On-Hand</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={e => handleIngredientChange(idx, e.target.value)}
                placeholder="e.g. chicken, rice, tomato"
                className="input-field flex-1"
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredientField(idx)} className="unit-toggle">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredientField} className="unit-toggle">Add Ingredient</button>
          <button type="submit" className="btn-primary w-full mt-4" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Meals'}
          </button>
        </form>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-soft transition-shadow">
              {meal.strMealThumb && (
                <div className="mb-4">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <h4 className="font-bold text-lg text-gray-900 mb-2">{meal.strMeal}</h4>
              <div className="mb-2 text-sm text-gray-600">{meal.strArea} | {meal.strCategory}</div>
              <div className="mb-2 text-sm text-gray-700">
                <strong>Ingredients:</strong>
                <ul className="list-disc list-inside">
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                    const ing = meal[`strIngredient${i}`]
                    const measure = meal[`strMeasure${i}`]
                    return ing && ing.trim() ? (
                      <li key={i}>{measure ? `${measure.trim()} ` : ''}{ing.trim()}</li>
                    ) : null
                  })}
                </ul>
              </div>
              {meal.strInstructions && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-primary-600">Show Instructions</summary>
                  <p className="text-sm text-gray-700 whitespace-pre-line mt-2">{meal.strInstructions}</p>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OnHandIngredients 