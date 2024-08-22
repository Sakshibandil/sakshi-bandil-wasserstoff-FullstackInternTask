import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateContextProvider } from './Context';  

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StateContextProvider>  {/* Wrap App with StateContextProvider */}
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
