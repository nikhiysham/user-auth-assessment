# User Authentication App

User Auth App Assessment.

## Features

- **Authentication Context**: Global authentication state management using React Context API
- **Login Screen**: Email/password inputs with validation and error alerts
- **Signup Screen**: User registration with name, email, and password with error alerts
- **Home Screen**: Displays logged-in user's information with confirmation logout
- **Persistent Authentication**: Uses AsyncStorage to persist login state across app restarts
- **Navigation**: Seamless navigation between screens using Expo Router
- **Beautiful UI**: Modern design with shadows, gradients, icons, and smooth animations
- **Password Visibility Toggle**: Eye icon to show/hide passwords
- **Loading States**: Visual feedback during authentication operations
- **Error Handling**: Alert dialogs for all error scenarios

## Setup Instructions

1. Install dependencies
   npm install

2. Start the app
   npx expo start

## Implemented Features

### Authentication Context

- `login(email, password)`: Authenticates user and sets user state
- `signup(name, email, password)`: Creates new user and logs them in
- `logout()`: Clears user state and removes persisted data
- `user`: Current user object with name and email

### Screens

- **Login**: Email/password inputs, validation, error alerts, password toggle
- **Signup**: Name/email/password inputs, validation, error alerts, password toggle
- **Home**: User profile display with avatar, confirmation logout dialog

### Persistence

- User data stored in AsyncStorage
- Automatic login restoration on app restart

## Technologies Used

- React Native
- Expo
- Expo Router
- React Context API
- AsyncStorage
- Ionicons (vector icons)
- TypeScript
