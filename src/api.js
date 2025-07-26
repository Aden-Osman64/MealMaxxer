// Utility functions for fetching meals from TheMealDB API

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

// TheMealDB does not have explicit breakfast/lunch/dinner categories for all meals,
// but it does have some categories and areas we can use. We'll map meal types to categories.
const mealTypeToCategory = {
  breakfast: 'Breakfast',
  lunch: 'Chicken', // Use 'Chicken' as a common lunch category
  snack: 'Dessert', // Use 'Dessert' for snacks
  dinner: 'Beef'    // Use 'Beef' as a common dinner category
}

export async function fetchMealByType(type) {
  const category = mealTypeToCategory[type] || 'Miscellaneous'
  const url = `${BASE_URL}filter.php?c=${encodeURIComponent(category)}`
  const res = await fetch(url)
  const data = await res.json()
  if (!data.meals || data.meals.length === 0) return null
  // Pick a random meal from the category
  const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)]
  // Fetch full meal details
  const mealDetailsUrl = `${BASE_URL}lookup.php?i=${randomMeal.idMeal}`
  const detailsRes = await fetch(mealDetailsUrl)
  const detailsData = await detailsRes.json()
  return detailsData.meals ? detailsData.meals[0] : null
} 