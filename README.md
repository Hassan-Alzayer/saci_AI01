# SCAI-ai
# Hetaf App

A modern React Native application for managing stadium seating and events, built with Expo.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm (v9 or newer)
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will start in development mode. You can view it:
- In your browser at `http://localhost:8081`
- On your mobile device using the Expo Go app
- In an emulator/simulator

## 📱 Features

- **Welcome Screen**: Beautiful onboarding experience
- **Home Dashboard**: View upcoming events and reservations
- **Interactive Map**: Stadium seating visualization
- **Profile Management**: User profile and settings
- **Card Management**: Digital membership cards

## 📂 Project Structure

```
app/
├── index.tsx              # Entry redirect
├── welcome.tsx           # Welcome screen
├── (app)/
│   └── _layout.tsx      # App layout configuration
└── (tabs)/
    ├── _layout.tsx      # Tab navigation layout
    ├── index.tsx        # Home dashboard
    ├── calendar.tsx     # Map/Calendar view
    └── profile.tsx      # User profile
```

## 🛠 Tech Stack

- React Native
- Expo Router
- TypeScript
- Lucide Icons

##  🤖 AI & Data
AI Code: passx.ipynb — Jupyter Notebook containing AI logic and models for analyzing stadium crowd data.

Dataset: Crowd Density Dataset (Roboflow) used for training the AI system :
https://universe.roboflow.com/abraham-wzqh2/crowd-density-ou3ne/dataset/1/download
## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
