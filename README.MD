# Sup Work

This application is built on React Native with Expo engine and firebase auth.

# Getting Started

Obtain the Firebase API keys from a coworker and add to `config/firebase-config.js`
Obtain the Google Auth API keys from a coworker and add to `config/index.js`
Obtain `.env` and `.env.production` files from a coworker and add them to root

## Starting the app

Install X-code (was developed with v11.3.1)
`sudo xcode-select --reset`
`nvm install-latest-npm`
`npm install -g expo-cli`

### Start app in development mode as default

`npm run start`

### Build app in production mode as default
Ensure the correct Database is reference in .env.production then run npm build

`npm run build`

Prompts during build
- Log into Apple account? Yes
- Generate a new Apple Provisioning Profile? No
