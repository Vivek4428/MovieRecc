import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/movieApi";
import "./Login.css";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData); // Call your login API
      if (response?.token) {      // Correct it >>>>>>

        localStorage.setItem("token", response.token); // Store the token

        setIsLoggedIn(true); // Update context state
        
        navigate("/"); // Redirect to the home page
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.log("error : ", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
