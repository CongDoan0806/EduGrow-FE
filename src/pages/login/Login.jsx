import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

import LoginForm from '../../components/login/LoginForm';
import CycleDecor from '../../components/login/CycleDecor';
import LoginDecoImages from '../../components/login/LoginDecoImages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Lấy CSRF cookie trước khi POST
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  
      const response = await axios.post('/api/login', {
        email,
        password
      }, {
        withCredentials: true
      });
  
      const { token, role, user } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));
  
      if (role === 'student') {
        navigate('/student/homePage');
      } else if (role === 'teacher') {
        navigate('/teacher/homePage');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
  
    } catch (error) {
      if (error.response?.data?.errors?.email) {
        toast.error('Login failed. Please check your information again.');
      } else {
        toast.error('Login failed. Please check your information again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="main-container d-flex justify-content-center align-items-center">
        <div className="login-box text-center p-5 shadow position-relative">
          <h2 className="mb-4 fw-bold welcome-text mb-5">Welcome!</h2>
          <LoginForm 
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
          />
          <div className="image-manlogin">
            <img src='/assets/images/login/manlogin.png' alt="manlogin.png" />
          </div>
        </div>
      </div>
      <LoginDecoImages />
      <CycleDecor />
      <ToastContainer />
    </div>
  );
}
