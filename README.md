# NestRoom Resident Mobile App

A premium React Native (Expo) mobile application for NestRoom hostel residents.

## Features

- **Secure Authentication**: JWT-based login with persistent sessions.
- **Geofenced Attendance**: Mark attendance based on hostel location.
- **Complaints Management**: Submit and track maintenance issues with image attachments.
- **Food & Dining**: View weekly menus and manage meal opt-ins.
- **Payments**: Track dues and download automated PDF invoices.
- **Push Notifications**: Real-time updates for important announcements.

## Tech Stack

- **Framework**: Expo (React Native)
- **Routing**: Expo Router (File-based routing)
- **Styling**: Native StyleSheet with a custom premium design system.
- **State Management**: React Context API.
- **API**: Custom `secureFetch` wrapper with `expo-secure-store`.
- **Validation**: Zod.
- **Date Handling**: date-fns.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo Go app on your mobile device (optional, for testing on physical devices)
- Android Studio (for Android Emulator) or Xcode (for iOS Simulator)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd nestroom-hostels-residents-mobile
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- Start the development server:
  ```bash
  npm start
  ```
- Run on Android:
  ```bash
  npm run android
  ```
- Run on iOS:
  ```bash
  npm run ios
  ```

## Development Workflow

This project follows a strict granular commit roadmap. Refer to [implementation_plan.md](./implementation_plan.md) for the detailed development phases.

## Build and Deployment

Builds are managed via EAS (Expo Application Services).

- To build for Android:
  ```bash
  eas build --platform android
  ```
- To build for iOS:
  ```bash
  eas build --platform ios
  ```
