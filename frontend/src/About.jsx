import { Navigate } from "react-router-dom";

function About({isAuthenticated}){
    if(!isAuthenticated){
        return <Navigate to="/login" replace state={{ message: "Please login first to access this content." }}/>
    }
    return (
    <div className="container mt-5">
      <h2>About Page</h2>
      <p>This is protected content.</p>
    </div>        
    );
}

export default About;