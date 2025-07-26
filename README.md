# MealMaxxers

A sleek, modern responsive web application for personalized meal planning. Built with React and TailwindCSS.

## Features

- **Personalized Meal Plans**: Generate custom meal plans based on your body metrics and fitness goals
- **Macro Tracking**: Detailed breakdown of protein, carbs, and fats
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Calculations**: Instant calorie and macro calculations using scientific formulas

## Tech Stack

- **React 18** - Modern React with hooks
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Inter Font** - Clean, modern typography

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MealMaxxers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Usage

1. **Enter Your Information**: Fill in your height, weight, age, sex, and fitness goal
2. **Generate Plan**: Click "Generate Meal Plan" to create your personalized nutrition plan
3. **View Results**: See your daily calorie target, macro breakdown, and meal suggestions

## Features

### Hero Section
- Eye-catching logo and tagline
- Feature highlights with visual indicators

### Input Form
- Height (cm)
- Weight (kg)
- Age
- Sex (Male/Female)
- Fitness Goal (Bulking/Cutting/Maintaining)
- Form validation with error messages

### Results Display
- Total daily calories
- Macro breakdown with visual progress bars
- Daily meal plan with 4 meals
- Individual meal details including ingredients and macros

## Design Features

- **Mobile-First**: Responsive design that works on all screen sizes
- **Modern Typography**: Inter font for clean, readable text
- **Subtle Animations**: Hover effects and smooth transitions
- **Color-Coded Macros**: Visual distinction between protein, carbs, and fats
- **Card-Based Layout**: Clean, organized information presentation
- **Gradient Backgrounds**: Modern visual appeal

## Nutrition Calculations

The app uses the Mifflin-St Jeor Equation for BMR calculation:
- **Men**: BMR = 10 × weight + 6.25 × height - 5 × age + 5
- **Women**: BMR = 10 × weight + 6.25 × height - 5 × age - 161

Calorie adjustments based on fitness goals:
- **Bulking**: TDEE + 300 calories
- **Cutting**: TDEE - 500 calories
- **Maintaining**: TDEE (no adjustment)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
