import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import ListStudent from './pages/admins/listManager/ListManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>      
      {/*<AppRoutes />*/}
      <AppRoutes/>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
