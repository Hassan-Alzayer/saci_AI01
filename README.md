#📱 Hataf App
A modern React Native application for managing stadium seating and events, built with Expo.

#🚀 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v18 or newer)

npm (v9 or newer)

Expo CLI

Installation
Clone the repository

bash
Copy
git clone <repository-url>
cd hataf-app
Install dependencies

bash
Copy
npm install
Start the development server

bash
Copy
npm run dev
You can then:

Open it in your browser: http://localhost:8081

Use the Expo Go app on your mobile device

Run it in an Android/iOS emulator or simulator

#📱 Features
Welcome Screen – Beautiful onboarding experience

Home Dashboard – View upcoming events and ticket reservations

Interactive Map – Visualize stadium seating dynamically

Profile Management – Manage user profile and preferences

Card Management – Digital access and membership cards

#📂 Project Structure
plaintext
Copy
app/
├── index.tsx              # Entry point, redirects to welcome
├── welcome.tsx            # Welcome screen
├── (app)/
│   └── _layout.tsx        # App layout configuration
└── (tabs)/
    ├── _layout.tsx        # Tab navigation layout
    ├── index.tsx          # Home dashboard
    ├── calendar.tsx       # Calendar and stadium map
    └── profile.tsx        # User profile
#🛠 Tech Stack
React Native

Expo Router

TypeScript

Lucide Icons
