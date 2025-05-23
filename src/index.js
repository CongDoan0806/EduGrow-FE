import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import Notifications from './pages/teachers/view_student_journal/Notification';

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
