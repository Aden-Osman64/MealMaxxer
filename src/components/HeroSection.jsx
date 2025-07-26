const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-medium mb-4">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Meal<span className="text-primary-600">Maxxers</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your personal AI-powered meal planner. Get customized nutrition plans tailored to your goals.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full"></div>
          <span>Personalized Plans</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full"></div>
          <span>Macro Tracking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full"></div>
          <span>Goal-Oriented</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 