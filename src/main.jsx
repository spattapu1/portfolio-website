import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Make sure this points to the correct location of your App component
import './index.css';     // Import your CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
