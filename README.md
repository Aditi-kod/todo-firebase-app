#  React Native To-Do App with Firebase

A simple and intuitive **To-Do List mobile app** built using **React Native (Expo)** and **Firebase**. This app allows users to register, log in, add tasks, mark them as complete, and delete them — with real-time updates and a user profile screen.


##  Features

-  **Firebase Authentication**
  - Register and log in with email/password

-  **Add, View, and Delete Tasks**
  - Real-time sync using **Firestore**
  - Strike-through completed tasks
  - Delete tasks instantly

-  **User Profile Screen**
  - Displays email and profile image
  - Option to log out
  - Profile image stored using **Firebase Storage**

-  **Live Updates**
  - All changes reflect instantly without needing to reload

---

## Tech Stack

- **React Native (Expo)**
- **Firebase**
  - Authentication
  - Firestore (Database)
  - Storage
- **Expo Router (Navigation)**
- **Styled using React Native Stylesheets**


##  Screenshots

| Login/Register | To-Do List | Profile |
|----------------|------------|---------|
|  Coming soon |  Coming soon |  Coming soon |


##  Folder Structure

to-do-app
|
todo-firebase-app/
├── assets/
├── screens/
│ ├── LoginScreen.js
│ ├── RegisterScreen.js
│ ├── TodoScreen.js
│ └── ProfileScreen.js
├── firebase.js
├── App.js
├── .gitignore
├── package.json
└── README.md


##  Firebase Setup (Important)

To connect your app with Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Replace the Firebase config in `firebase.js` with your own

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};


## Set Firestore Rules:

js
Copy
Edit
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{docId} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}

##  How to Run

# 1. Clone the repository
git clone https://github.com/Aditi-code/todo-firebase-app.git
cd todo-firebase-app

# 2. Install dependencies
npm install

# 3. Start the Expo app
npx expo start
Use Android emulator or scan the QR code with Expo Go on your mobile to test.

##  Demo Video
https://drive.google.com/file/d/139rJf14HRuNUbAlY8u3mhxz-GrB2RHc0/view?usp=drive_link

##  About Me
Aditi Kumari
Full-stack developer & tech enthusiast 
https://github.com/Aditi-kod

## License
This project is open source and free to use under the MIT License.







