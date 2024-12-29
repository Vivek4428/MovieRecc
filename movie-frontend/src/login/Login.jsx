import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/movieApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdArrowOutward } from "react-icons/md";
import "./Login.css";

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
      if (response?.token) {
        // Correct it >>>>>>

        localStorage.setItem("token", response.token); // Store the token

        setIsLoggedIn(true); // Update context state
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate(-1); // Redirect to the home page
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
        <Link to={'/signup'} className="signup-redirect"><p>No Account? Signup<MdArrowOutward /></p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
