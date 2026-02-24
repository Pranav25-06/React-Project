import { useNavigate } from "react-router-dom";

function MyDetails({ user,isAuthenticated }) {
  if (!user) return null;
  if(!isAuthenticated){
        return <Navigate to="/login" replace state={{ message: "Please login first to access this content." }}/>
    }
  const navigate = useNavigate();
  const onClose = ()=>{
    navigate("/dashboard");
  }
  const handleClick = ()=>{
    navigate("/editprofile");
  }
   const handleClick2 = ()=>{
    navigate("/updatepass");
  }
  return (
    <div>
      {/* Profile Image */}
      <div className="text-center mb-4">
        <img
          src={user.image || "https://via.placeholder.com/250"}
          alt={user.fullname}
          className="rounded-circle img-fluid shadow"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
            border: "4px solid #0d6efd",
          }}
        />
      </div>

      {/* Name & Username */}
      <h4 className="text-center fw-bold mb-1">{user.full_name}</h4>
      

      {/* User Info */}
      <div className="mb-2"><strong>ID:</strong> {user.id}</div>
      <div className="mb-2"><strong>Email:</strong> {user.email}</div>
      <div className="mb-2"><strong>Address:</strong> {user.address}</div>
      <div className="mb-2"><strong>Designation:</strong> {user.designation || "Employee"}</div>

      {/* Badges */}
      <div className="d-flex justify-content-center gap-2 mt-3 mb-3">
        <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">
          Employee
        </span>
        <span className="badge bg-success rounded-pill px-3 py-2 shadow-sm">
          Active
        </span>
      </div>

      {/* Buttons */}
      <div className="d-grid gap-2">
        
        <button className="btn btn-primary rounded-pill" onClick={handleClick}>Edit Profile</button>
        <button className="btn btn-primary rounded-pill" onClick={handleClick2}>Update Password</button>
        <button className="btn btn-outline-danger rounded-pill" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Optional Styling */}
      <style jsx>{`
        .btn-outline-danger:hover {
          background-color: #f8d7da;
          color: #842029;
        }
      `}</style>
    </div>
  );
}

export default MyDetails;