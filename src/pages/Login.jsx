import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5002/login", form, {
        withCredentials: true,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", JSON.stringify(data.result));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
            <a href="/signup">Don't have an account? Signup</a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
