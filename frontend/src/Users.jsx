import { useState } from "react";
import UserDetails from "./User";
import { Navigate, useNavigate } from "react-router-dom";

function Users({ users, isAuthenticated, isAdmin, setUsers }) {
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please login first to access this content." }}
      />
    );
  }

  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  if (!users || users.length === 0) {
    return <p className="text-center mt-5">No users found</p>;
  }

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("User deleted successfully!");
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        setSelectedUser(null);
        navigate("/users");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="container  pt-navbar mt-45 " style={{paddingTop:"6200px"}}>
      <div className="row g-4">
        {/* Left: User Grid */}
        <div className={`col-12 ${selectedUser ? "col-lg-8" : ""}`}>
          <div className="row g-4">
            {users
              .filter((user) => user.email !== "admin@gmail.com")
              .map((user) => (
                <div
                  className="col-12 col-sm-6 col-md-4"
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="user-card card shadow-sm rounded-4 p-3 h-100">
                    <UserDetails user={user} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Selected User Details */}
        {selectedUser && (
          <div className="col-12 col-lg-4">
            <div className="card shadow-lg rounded-4 p-3 sticky-top selected-user-card">
              <img
                src={selectedUser.image || "https://via.placeholder.com/250"}
                alt={selectedUser.full_name}
                className="img-fluid rounded mb-3"
                style={{ height: "250px", objectFit: "cover", width: "100%" }}
              />
              <h4 className="fw-bold">{selectedUser.full_name}</h4>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>Designation:</strong> {selectedUser.designation || "Employee"}
              </p>

              <button
                className="btn btn-outline-secondary btn-sm mt-2 w-100 rounded-pill"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>

              {isAdmin && (
                <button
                  className="btn btn-danger btn-sm mt-2 w-100 rounded-pill"
                  onClick={() => handleDelete(selectedUser.id)}
                >
                  Delete User
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .user-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .user-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .selected-user-card img:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        @media (max-width: 991px) {
          .sticky-top {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Users;