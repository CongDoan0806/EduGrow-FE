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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true); // Bắt đầu loading
      
      // Lấy CSRF cookie trước khi POST
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
  
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      const { token, role, user } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Login successful:', response.data);

      // Delay 1 giây để hiển thị loading screen rồi mới navigate
      setTimeout(() => {
        if (role === 'student') {
          navigate('/student/homePage');
        } else if (role === 'teacher') {
          navigate('/teacher/homePage');
        } else if (role === 'admin') {
          navigate('/admin/dashboard');
        }
      }, 1000);
  
    } catch (error) {
      setIsLoading(false); // Tắt loading khi có lỗi
      if (error.response?.data?.errors?.email) {
        toast.error('Login failed. Please check your information again.');
      } else {
        toast.error('Login failed. Please check your information again.');
      }
    }
  };

  // Loading Screen Component
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="logo-container">
            <div className="logo-text">EduGrow</div>
          </div>
          <div className="spinner-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>  
        </div>
      </div>
    );
  }

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