import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { MetaMaskProvider } from './Context/MetaMaskContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </BrowserRouter>
  </React.StrictMode>
);