import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../app.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("token", "fake-token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <h2>Login Page</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e:any) => setUsername(e.target.value)}
        data-testid="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e:any) => setPassword(e.target.value)}
        data-testid="password"
      />
      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>
    </div>
  );
}
