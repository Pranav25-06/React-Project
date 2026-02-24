import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp({setIsSignedIn, setUsername ,setIsLoggedIn}){

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  async function handleSubmit(e){
    e.preventDefault();
    fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            alert(response.message);

            if (response.success) {
                setUsername(response.username);
                setIsSignedIn(true);
                setIsLoggedIn(true);
                console.log(response.fullname);
                navigate('/dashboard');
            }
        })
        .catch(err => console.error(err));
    } 
        return(
            <>
            
    <div className="signup-container">
        <h2>Create Account</h2>

        
        <form id="signupForm" onSubmit={handleSubmit}>

            <div className="input-group">
                <label>Full Name</label>
                <input type="text" id="fullname" placeholder="Enter your full name" onChange={handleChange} name="fullname" required/>
            </div>

            <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" 
                       pattern="[0-9]{10}" maxLength="10" onChange={handleChange} name="phone" required/>
            </div>

            <div className="input-group">
                <label>Email</label>
                <input type="email" id="email" placeholder="Enter your email" onChange={handleChange} name="email" required/>
            </div>

            <div className="input-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="Create a password" onChange={handleChange} name="password" required/>
            </div>

            <button type="submit" className="signup-btn" id="formButton">Sign Up</button>

        </form>

        {/* <div class="extra-links">
            <p>Already have an account? <a onclick="goToLogin()">Login</a></p>
        </div> */}
    </div>

    
    


   

            </>
        )
    
}

export default SignUp;