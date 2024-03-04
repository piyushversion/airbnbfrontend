import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AppContextProvider>
      <App />
      <Toaster></Toaster>
    </AppContextProvider>
  </BrowserRouter>
  
);


