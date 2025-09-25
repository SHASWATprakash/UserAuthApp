# UserAuthApp

A simple React Native CLI (TypeScript) authentication demo app.  
Implements **Signup**, **Login**, and **Home** screens with local storage (AsyncStorage) and a password visibility toggle using custom icons.

---

##  Features

- **User Registration (Signup)**  
  - Name, Email, Password fields with client-side validation  
  - Stores users locally in AsyncStorage (simulating a backend)  
  - Automatically logs the user in after signup  

- **User Login**  
  - Validates email and password  
  - Displays error messages for invalid credentials  
  - Persists the logged-in user across app restarts  

- **Home Screen**  
  - Displays logged-in user’s name and email  
  - Logout button to clear session  

- **Password Visibility Toggle**  
  - Custom icons (`eye.png` and `noViewEye.png`) to show or hide password  
  - Implemented on both Login and Signup screens  

- **React Context API**  
  - Centralized auth state with login, signup, logout functions  
  - Automatically switches navigation stacks based on auth state  

- **Typed Navigation**  
  - Uses React Navigation Native Stack with TypeScript support  

---

##  Project Structure

UserAuthApp/
├─ App.tsx
├─ assets/
│ ├─ eye.png
│ └─ noViewEye.png
└─ src/
├─ context/AuthContext.tsx
├─ navigation/index.tsx
├─ components/LoadingScreen.tsx
└─ screens/
├─ LoginScreen.tsx
├─ SignupScreen.tsx
└─ HomeScreen.tsx




##  Setup Instructions

 1. Clone the Repository

 git clone https://github.com/SHASWATprakash/UserAuthApp.git
 cd UserAuthApp
 2. Install Dependencies

 npm install
3. Install iOS Pods (if on macOS)

 cd ios && pod install && cd ..
4. Start the Metro Bundler


 npx react-native start
5. Run the App
Android:



 npx react-native run-android
iOS:



 npx react-native run-ios
6. Reset Metro Cache (if needed)
If you change assets or encounter module errors:


 npx react-native start --reset-cache

##  Usage
Signup with a new name/email/password.

After signup you are automatically logged in and taken to the Home screen.

Logout from the Home screen to return to the Login screen.

Login again with the same credentials to test persistence.

Toggle Password Visibility by tapping the eye/no-eye icon next to the password field.

##  Security Note
This app stores user data in plaintext locally using AsyncStorage — this is for demonstration only.
For production apps:

Use a secure backend with hashed passwords.

Store tokens securely (e.g. expo-secure-store or Keychain/Keystore).

##  Tech Stack
React Native CLI (TypeScript)

React Navigation (Native Stack)

React Context API

AsyncStorage for local data persistence



## 🎥 Demo Video

https://github.com/SHASWATprakash/UserAuthApp/raw/main/demo/Demo.mp4
