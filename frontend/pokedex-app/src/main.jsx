//pokedex-app/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';


const root = ReactDOM.createRoot(document.getElementById('root')); //opprettet root 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);