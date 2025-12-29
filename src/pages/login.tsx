// src/Login.jsx
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../app.css"
export const Login = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

 

  const handleLogin = async () => { // Function is marked as async
        try {
            // Await the asynchronous loginPopup function
            const loginResponse = await instance.loginPopup(loginRequest);
            console.log("Login successful:", loginResponse);
            // You can perform post-login actions here, e.g., call an API
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (accounts.length > 0) {
      navigate('/dashboard');
    }
  }, [accounts, navigate]);

  return (
    <div className="wrapper">
      <h1>Welcome to the App</h1>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};
