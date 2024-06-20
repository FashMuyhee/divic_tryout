
# Shipment Tracker App

## Introduction
This is a simple shipment tracking app built with React Native. The app allows drivers to manage their shipment status. It includes features like a splash screen, a login screen with validation, and a shipment list screen. The project is written in TypeScript.
## Features

- Splash Screen: Includes animation based on the provided Figma file.
- Login Screen: Features validation, animations, and fields for username/email and password.
- Shipment List Screen: Displays a list of shipments with their status, using a <code>Flatlist</code>

## Installation and Setup

Installation and Setup

**Prerequisites**

* Node.js (version >= 12)
* npm or yarn
* React Native CLI
* Android Studio (for Android development)
* Xcode (for iOS development)

**Steps to Run the App**

1. Clone the repository

```bash
 git clone https://github.com/FashMuyhee/divic_tryout.git
 cd divic_tryout
```
2. Install dependencies
```bash
 yarn install 
```
or 

```bash
 npm install
```
3. Link native dependencies for iOS

```bash
 npx pod-install
```
4. Run the app
```bash
 yarn start
```
 for Android Press  <kbd> a </kbd> or <kbd>i</kbd> for iOS after running  `yarn start`

**Running the App on an Emulator**
1. Android: Open Android Studio, create a new virtual device and ensure it's running.
2. iOS: Open Xcode, select a simulator and ensure it's running.

   
## Folder Structure

    ├── android                   # Native Android code
    ├── ios                       # Native iOS code
    ├── src                       # Source code
        ├── assets/               # Asset files (images and fonts)
    │   ├── components/           # Reusable components (commons and icons)
            ├── commons/          # reusable components (TextInput, Button ...)
            ├── icons/            # svg icons 
    │   ├── routes/               # Navigation configurations
    │   ├── utils/                # Utility fucntions and constants
    │   ├── hooks/                # Custom hooks
    │   ├── views/                # Screen components
    │   ├── contexts/             # Context 
    └── ...
