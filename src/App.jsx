import { useState } from 'react'
import HeroSection from './components/HeroSection'
import MealPlanForm from './components/MealPlanForm'
import ResultsSection from './components/ResultsSection'
import { fetchMealByType } from './api'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import OnHandIngredients from './components/OnHandIngredients'

function App() {
  const [mealPlan, setMealPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateMealPlan = async (formData) => {
    setIsLoading(true)
    // Fetch meals for each type
    const mealTypes = [
      { type: 'breakfast', label: 'Breakfast' },
      { type: 'lunch', label: 'Lunch' },
      { type: 'snack', label: 'Snack' },
      { type: 'dinner', label: 'Dinner' }
    ]
    const meals = []
    for (const mealType of mealTypes) {
      const meal = await fetchMealByType(mealType.type)
      if (meal) {
        // Parse ingredients
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`]
          const measure = meal[`strMeasure${i}`]
          if (ingredient && ingredient.trim()) {
            ingredients.push(measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim())
          }
        }
        meals.push({
          name: meal.strMeal,
          time: mealType.label,
          image: meal.strMealThumb,
          calories: null, // Will be filled in below
          protein: null,
          carbs: null,
          fats: null,
          ingredients
        })
      }
    }
    // Calculate macros and calories for each meal proportionally
    const totalCalories = calculateCalories(formData)
    const macros = calculateMacros(formData)
    const mealSplits = [0.25, 0.30, 0.15, 0.30] // breakfast, lunch, snack, dinner
    meals.forEach((meal, idx) => {
      meal.calories = Math.round(totalCalories * mealSplits[idx])
      meal.protein = Math.round(macros.protein * mealSplits[idx])
      meal.carbs = Math.round(macros.carbs * mealSplits[idx])
      meal.fats = Math.round(macros.fats * mealSplits[idx])
    })
    setMealPlan({
      totalCalories,
      macros,
      meals
    })
    setIsLoading(false)
  }

  const calculateCalories = (data) => {
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr
    if (data.sex === 'male') {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
    } else {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161
    }
    
    // Activity multiplier (assuming moderate activity)
    const tdee = bmr * 1.55
    
    // Adjust based on goal
    switch (data.fitnessGoal) {
      case 'bulking':
        return Math.round(tdee + 300)
      case 'cutting':
        return Math.round(tdee - 500)
      default:
        return Math.round(tdee)
    }
  }

  const calculateMacros = (data) => {
    const calories = calculateCalories(data)
    let protein, carbs, fats
    
    switch (data.fitnessGoal) {
      case 'bulking':
        // Use 2g protein per kg of body weight for bulking
        protein = Math.round(data.weight * 2)
        // Calculate remaining calories after protein
        const proteinCals = protein * 4
        // 55% carbs, 20% fats for remaining calories
        const remainingCals = calories - proteinCals
        carbs = Math.round((remainingCals * 0.73) / 4) // 73% of remaining cals to carbs
        fats = Math.round((remainingCals * 0.27) / 9)  // 27% of remaining cals to fats
        break
      case 'cutting':
        // Keep original logic for now
        protein = Math.round((calories * 0.35) / 4)
        carbs = Math.round((calories * 0.35) / 4)
        fats = Math.round((calories * 0.30) / 9)
        break
      default:
        // Use 1.5g protein per kg of body weight for maintenance
        protein = Math.round(data.weight * 1.5)
        const proteinCalsMaint = protein * 4
        const remainingCalsMaint = calories - proteinCalsMaint
        // 55% carbs, 25% fats for remaining calories
        carbs = Math.round((remainingCalsMaint * 0.69) / 4) // 69% of remaining cals to carbs
        fats = Math.round((remainingCalsMaint * 0.31) / 9)  // 31% of remaining cals to fats
    }
    
    return { protein, carbs, fats }
  }

  const generateMockMeals = (data) => {
    const calories = calculateCalories(data)
    const macros = calculateMacros(data)
    
    return [
      {
        name: "Protein Power Breakfast",
        time: "Breakfast",
        calories: Math.round(calories * 0.25),
        protein: Math.round(macros.protein * 0.25),
        carbs: Math.round(macros.carbs * 0.25),
        fats: Math.round(macros.fats * 0.25),
        ingredients: ["Oatmeal", "Greek yogurt", "Berries", "Almonds", "Honey"]
      },
      {
        name: "Lean Lunch Bowl",
        time: "Lunch",
        calories: Math.round(calories * 0.30),
        protein: Math.round(macros.protein * 0.30),
        carbs: Math.round(macros.carbs * 0.30),
        fats: Math.round(macros.fats * 0.30),
        ingredients: ["Grilled chicken", "Quinoa", "Mixed greens", "Avocado", "Olive oil"]
      },
      {
        name: "Pre-Workout Snack",
        time: "Snack",
        calories: Math.round(calories * 0.15),
        protein: Math.round(macros.protein * 0.15),
        carbs: Math.round(macros.carbs * 0.15),
        fats: Math.round(macros.fats * 0.15),
        ingredients: ["Banana", "Protein shake", "Peanut butter"]
      },
      {
        name: "Post-Workout Recovery",
        time: "Dinner",
        calories: Math.round(calories * 0.30),
        protein: Math.round(macros.protein * 0.30),
        carbs: Math.round(macros.carbs * 0.30),
        fats: Math.round(macros.fats * 0.30),
        ingredients: ["Salmon", "Sweet potato", "Broccoli", "Brown rice", "Lemon"]
      }
    ]
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <OnHandButton />
                <MealPlanForm onSubmit={generateMealPlan} isLoading={isLoading} />
                {mealPlan && <ResultsSection mealPlan={mealPlan} />}
              </>
            } />
            <Route path="/on-hand" element={<OnHandIngredients />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

function OnHandButton() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center mb-8">
      <button
        className="btn-primary"
        onClick={() => navigate('/on-hand')}
      >
        Generate Meals From Ingredients On-Hand
      </button>
    </div>
  )
}

export default App 