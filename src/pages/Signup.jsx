import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5002/user/signup", form, {
        withCredentials: true,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.result.role);
      localStorage.setItem("user", JSON.stringify(data.result));

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Signup</button>
            <a href="/login">Already have an account? Login</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
