import { Navigate } from "react-router-dom";
function UserDetails({ user,isAuthenticated}) {
  if (!user) return null;
  
  return (
    <div className="card shadow-lg rounded-4 p-3 sticky-top selected-user-card" style={{ top: "80px" }}>
      {/* Profile Image */}
      <div className="text-center mb-3">
        <img
          src={user.image || "https://via.placeholder.com/250"}
          alt={user.fullname}
          className="rounded-circle img-fluid"
          style={{ width: "150px", height: "150px", objectFit: "cover", border: "4px solid #0d6efd" }}
        />
      </div>

      {/* User Info */}
      <h4 className="text-center fw-bold mb-2">{user.fullname}</h4>
      <p className="text-center text-muted mb-3">@{user.username || "username"}</p>

      <div className="mb-2">
        <strong>ID:</strong> <span className="text-secondary">{user.id}</span>
      </div>
      <div className="mb-2">
        <strong>Email:</strong> <span className="text-secondary">{user.email}</span>
      </div>
      <div className="mb-2">
        <strong>Address:</strong> <span className="text-secondary">{user.address}</span>
      </div>

      {/* Badges */}
      <div className="d-flex justify-content-center gap-2 mt-3 mb-3">
        <span className="badge bg-primary rounded-pill px-3 py-2">
          {user.designation || "Employee"}
        </span>
        <span className="badge bg-success rounded-pill px-3 py-2">
          Active
        </span>
      </div>

      
      
    </div>
  );
}

export default UserDetails;
