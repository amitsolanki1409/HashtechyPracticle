This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Key Decisions](#key-decisions)
- [Additional Notes](#additional-notes)

---

The Version of React Native in this project is 0.75.3

# User Management App

A mobile application built with React Native that allows users to be fetched from an API, displayed in a list with infinite scrolling, and refreshed via pull-to-refresh. Users can be viewed in detail on a separate screen.

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **React Native CLI** (Not Expo)
- **Android Studio** or **Xcode** (for Android/iOS development)
- **Redux DevTools** (for debugging state)

### Setup Instructions

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/amitsolanki1409/HashtechyPracticle.git
   cd HashtechyPracticle
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the Metro bundler**:
   \`\`\`bash
   npx react-native start
   \`\`\`

4. **Run the app on an Android/iOS emulator or connected device**:
   \`\`\`bash
   npm run android # for Android
   #for ios first install Pod using below command
   npx pod-install
   npx run ios # for iOS
   \`\`\`

## Project Structure

Here's a high-level overview of the project structure:

\`\`\`
.
├── /android # Android native project files
├── /ios # iOS native project files
├── /src
│ ├── /components # UI components like UserListItem
│ ├── /screens # React Native Screens (UserListScreen, UserDetailScreen)
│ ├── /redux # Redux-related code (store, slices)
│ │ ├── /slices # Redux slices (userSlice)
│ │ ├── /store.js # Redux store (globle state)
│ ├── /navigation # Navigation setup (React Navigation)
│ └── App.js # Entry point for the app
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
\`\`\`

### **Key Components**:

1. **UserListScreen**: Displays the list of users with infinite scrolling and pull-to-refresh functionality.
2. **UserDetailScreen**: Displays detailed information about a selected user.
3. **UserListItem**: A reusable component for rendering each user in the list.
4. **Redux (userSlice.js)**: Handles state management for fetching users asynchronously, including error handling and pagination.

---

## Features

- **Infinite Scrolling**: Automatically loads more users when scrolling down.
- **Pull-to-Refresh**: Allows refreshing the user list by pulling down on the screen.
- **Navigation**: Uses React Navigation to navigate between the user list and user detail screens.
- **API Integration**: Fetches users from the [Random User API](https://randomuser.me/).
- **Redux State Management**: Uses Redux Toolkit with `createAsyncThunk` and `redux-thunk` for managing API calls and global state.

---

## Key Decisions

### **1. Bare React Native CLI**:

We opted for a bare React Native CLI setup instead of Expo to give more control over the project and allow the app to include native code when needed (e.g., third-party libraries that require native linking).

### **2. Redux Toolkit**:

Redux Toolkit was chosen for state management because it simplifies the process of setting up a Redux store and reduces boilerplate, especially with features like `createAsyncThunk` for handling async operations.

### **3. Component-Based Design**:

The app separates UI concerns by breaking down the list item component (`UserListItem`) into its own file. This makes the code more modular and easier to maintain or extend.

### **4. Error Handling**:

API error handling is implemented using the `.rejected` state of the async thunk. In case of an error during the API call, a message is shown using React Native's `Alert` component.

---

## Additional Notes

- **Pagination Logic**: The app uses the `page` query parameter in the API call for pagination. The `fetchUsers` action increments the page number whenever the user scrolls to the bottom of the list.
- **Performance Considerations**: A `FlatList` was used for rendering the user list to optimize performance for large data sets. Infinite scroll loads more data when the user is 50% away from the bottom.

- **Platform Support**: This app should work on both Android and iOS platforms. Ensure the necessary setup for Android (Android Studio) and iOS (Xcode) is complete before running the app on emulators or physical devices.

---

Thank you from,
Amitkumar Solanki.
