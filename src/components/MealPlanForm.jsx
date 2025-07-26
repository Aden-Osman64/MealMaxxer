import { useState } from 'react'

const convertLbsToKg = (lbs) => lbs * 0.453592
const convertKgToLbs = (kg) => kg / 0.453592
const convertCmToFeetInches = (cm) => {
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}
const convertFeetInchesToCm = (feet, inches) => (feet * 12 + inches) * 2.54

const MealPlanForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    sex: '',
    fitnessGoal: ''
  })
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'height' && heightUnit === 'cm') {
      setFormData(prev => ({ ...prev, height: value }))
    } else if (name === 'weight' && weightUnit === 'kg') {
      setFormData(prev => ({ ...prev, weight: value }))
    } else if (name === 'age' || name === 'sex' || name === 'fitnessGoal') {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleHeightUnitToggle = () => {
    if (heightUnit === 'cm') {
      // Convert cm to ft/in
      const { feet, inches } = convertCmToFeetInches(Number(formData.height) || 0)
      setHeightFt(feet || '')
      setHeightIn(inches || '')
      setHeightUnit('ft')
    } else {
      // Convert ft/in to cm
      const cm = convertFeetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0)
      setFormData(prev => ({ ...prev, height: cm ? Math.round(cm) : '' }))
      setHeightUnit('cm')
    }
  }

  const handleWeightUnitToggle = () => {
    if (weightUnit === 'kg') {
      // Convert kg to lb
      setFormData(prev => ({ ...prev, weight: prev.weight ? Math.round(convertKgToLbs(Number(prev.weight))) : '' }))
      setWeightUnit('lb')
    } else {
      // Convert lb to kg
      setFormData(prev => ({ ...prev, weight: prev.weight ? Math.round(convertLbsToKg(Number(prev.weight))) : '' }))
      setWeightUnit('kg')
    }
  }

  const handleHeightFtInChange = (e) => {
    const { name, value } = e.target
    if (name === 'heightFt') setHeightFt(value)
    if (name === 'heightIn') setHeightIn(value)
    if (errors.height) setErrors(prev => ({ ...prev, height: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    let heightCm = formData.height
    let weightKg = formData.weight
    if (heightUnit === 'ft') {
      heightCm = convertFeetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0)
    }
    if (weightUnit === 'lb') {
      weightKg = convertLbsToKg(Number(formData.weight) || 0)
    }
    if (!heightCm || heightCm < 100 || heightCm > 250) newErrors.height = 'Height must be between 100-250 cm'
    if (!weightKg || weightKg < 30 || weightKg > 300) newErrors.weight = 'Weight must be between 30-300 kg'
    if (!formData.age) newErrors.age = 'Age is required'
    if (!formData.sex) newErrors.sex = 'Sex is required'
    if (!formData.fitnessGoal) newErrors.fitnessGoal = 'Fitness goal is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let heightCm = formData.height
    let weightKg = formData.weight
    if (heightUnit === 'ft') {
      heightCm = convertFeetInchesToCm(Number(heightFt) || 0, Number(heightIn) || 0)
    }
    if (weightUnit === 'lb') {
      weightKg = convertLbsToKg(Number(formData.weight) || 0)
    }
    if (validateForm()) {
      onSubmit({ ...formData, height: Math.round(heightCm), weight: Math.round(weightKg) })
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Your Personalized Meal Plan
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Height */}
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={heightUnit === 'cm' ? formData.height : `${heightFt}'${heightIn}"`}
                  onChange={handleChange}
                  placeholder="175"
                  className={`input-field ${errors.height ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={handleHeightUnitToggle}
                  className="btn-secondary text-sm"
                >
                  {heightUnit === 'cm' ? 'cm' : 'ft/in'}
                </button>
              </div>
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height}</p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={weightUnit === 'kg' ? formData.weight : Math.round(convertKgToLbs(Number(formData.weight)))}
                  onChange={handleChange}
                  placeholder="70"
                  className={`input-field ${errors.weight ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={handleWeightUnitToggle}
                  className="btn-secondary text-sm"
                >
                  {weightUnit === 'kg' ? 'kg' : 'lb'}
                </button>
              </div>
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                className={`input-field ${errors.age ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Sex */}
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={`input-field ${errors.sex ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex && (
                <p className="mt-1 text-sm text-red-600">{errors.sex}</p>
              )}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Goal
            </label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className={`input-field ${errors.fitnessGoal ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Select your goal</option>
              <option value="bulking">Bulking (Gain Muscle)</option>
              <option value="cutting">Cutting (Lose Fat)</option>
              <option value="maintaining">Maintaining (Stay Fit)</option>
            </select>
            {errors.fitnessGoal && (
              <p className="mt-1 text-sm text-red-600">{errors.fitnessGoal}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Your Meal Plan...</span>
                </div>
              ) : (
                'Generate Meal Plan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MealPlanForm 