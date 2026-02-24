import { useState } from "react";
import { useNavigate } from "react-router-dom";
function EditProfile({user,setUser,isAuthenticated}) {
  // Mock user data for now, replace with API call
  if(!isAuthenticated){
        return <Navigate to="/login" replace state={{ message: "Please login first to access this content." }}/>
    }
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
        body: JSON.stringify({
          fullname: user.full_name,
          email: user.email,
          address: user.address,
          designation: user.designation,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      console.log(updatedUser)
      
      setUser(updatedUser.data);
      alert("Profile updated successfully!");
      navigate("/mydetails")
      
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={user.full_name}
            onChange={handleChange}
          />
        </div>

        

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={user.designation}
            onChange={handleChange}
          />
        </div>

        
       

        <button
          type="submit"
          className="btn btn-primary rounded-pill"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;