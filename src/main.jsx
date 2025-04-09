import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  // Make sure App.jsx exists in the same directory

// Get the root element to mount your app
const rootElement = document.getElementById('app')
const root = ReactDOM.createRoot(rootElement)

// Render your React application inside the root div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
