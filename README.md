# Contact Management System Frontend

This is the frontend repository for the Contact Management System, a web application that allows users to save and manage contact information. This project was created as part of the Hux Ventures Fullstack Developer Assessment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)


## Features

- User authentication (Signup/Login)
- Create, read, update, and delete contacts
- Responsive design
- Secure API calls to the backend

## Technologies Used

- React 18.3.1
- React Router 6.25.1
- Axios 1.7.2
- Tailwind CSS 3.4.6
- Heroicons 1.0.6

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hux-assessment-frontend.git
   cd hux-assessment-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   BASE_URL=http://localhost:5000/api
   ```
   Replace the URL with your backend API URL.

## Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Testing

To run the tests:

```
npm test
```

## Deployment

To create a production build:

```
npm run build
```

This will create a `build` folder with production-ready files.

