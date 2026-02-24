import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Login({ setIsAuthenticated , setUser,setIsAdmin }){
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const message = location.state?.message;
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
   

    try {
        setError("");
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      });

      const data = await response.json();

      console.log("Server Response:", data);
      console.log(data.success);
      if (data.success) {
        setIsAuthenticated(true)
        
        let user = data.user
        if(user.email === "admin@gmail.com"){
          setIsAdmin(true);
        }
        setUser(user);
        
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate(`/dashboard`);
      } else {
        if(data.message === "Invalid email Please register to login"){
          setInputs({ ...inputs, email: "",password: "" })
        }else{
          setInputs({ ...inputs, password: "" })
        }
        setError(data.message);
      }

    } catch (error) {
      console.log(error);
      setError("Login Failed")
    }
  }

  return (
    <>
    {message && (
  <div className="alert alert-warning text-center">
    {message}
  </div>
)}
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p>{inputs.email} + {inputs.password}</p>
    </>
  );
}

export default Login;