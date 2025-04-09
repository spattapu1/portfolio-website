import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM from react-dom/client for React 18+
import App from './App'; // Import App component
import './index.css'; // Optional: If you have a CSS file for styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
