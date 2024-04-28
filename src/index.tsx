import './styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);