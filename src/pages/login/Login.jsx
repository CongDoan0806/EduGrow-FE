import React from 'react'
import './Login.css'
import LoginForm from '../../components/login/LoginForm'
import CycleDecor from '../../components/login/CycleDecor'
import LoginDecoImages from '../../components/login/LoginDecoImages'
export default function Login() {
    // const [email, setEmail] = useState('')
    return (
        <div className="login-container">
        <div className="main-container d-flex justify-content-center align-items-center">
          <div className="login-box text-center p-5 shadow position-relative">
            <h2 className="mb-4 fw-bold welcome-text mb-5">Welcome!</h2>
            <LoginForm />
            <div className="image-manlogin">
              <img src='/assets/images/login/manlogin.png' alt="manlogin.png" />
            </div>
          </div>
        </div>
        <LoginDecoImages />
        <CycleDecor />
      </div>
    )
}
