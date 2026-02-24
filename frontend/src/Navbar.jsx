import { Link, useNavigate } from "react-router-dom";

function Navbar({ setIsAuthenticated, username, isAuthenticated }) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top py-2">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="navbar-nav ms-auto align-items-center gap-3">
              <Link className="nav-link fs-5" to="/contact">
                Contact
              </Link>
              <Link className="nav-link fs-5" to="/about">
                About
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/mydetails" className="text-light fs-4 nav-link">
                    <i className="bi bi-person-circle"></i>
                  </Link>
                  <span className="text-light fw-semibold">{username}</span>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-light btn-sm rounded-pill"
                    to="/login"
                  >
                    Login
                  </Link>
                  {/* <Link
                    className="btn btn-warning btn-sm rounded-pill"
                    to="/signup"
                  >
                    Signup
                  </Link> */}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Add spacing to prevent content overlap */}
      <div style={{ paddingTop: "80px" }} />

      <style jsx>{`
        .navbar-brand:hover {
          text-decoration: underline;
        }

        .nav-link {
          color: #f8f9fa;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #ffc107;
          text-decoration: underline;
        }

        .btn-outline-light:hover {
          background-color: #f8f9fa;
          color: #212529;
        }

        .btn-warning:hover {
          background-color: #ffc107cc;
          color: #212529;
        }

        @media (max-width: 991px) {
          .navbar-nav {
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;