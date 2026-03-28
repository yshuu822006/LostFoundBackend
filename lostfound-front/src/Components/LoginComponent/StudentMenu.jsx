import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import {
  FaUser,
  FaBoxOpen,
  FaSearch,
  FaSignOutAlt
} from "react-icons/fa";

const StudentMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar expand="lg" className="app-navbar" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-brand-custom">
            🎓 Lost & Found
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout} style={{ color: "#ffb4b4" }}>
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="menu-hero">
        <div className="menu-hero-inner">
          <h1 className="menu-hero-title">
            Student Dashboard
          </h1>
          <p className="menu-hero-sub">
            Manage your lost and found items easily and securely.
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <Container className="menu-content mt-4">
        <div className="menu-grid">

          {/* Personal Details */}
          <div
            className="menu-card"
            onClick={() => navigate("/personal-details")}
          >
            <div className="menu-icon"><FaUser /></div>
            <div className="menu-card-title">Personal Details</div>
            <div className="menu-card-desc">
              View and manage your profile information.
            </div>
          </div>

          {/* Submit Lost Item */}
          <div
            className="menu-card"
            onClick={() => navigate("/lost-item-form")}
          >
            <div className="menu-icon"><FaBoxOpen /></div>
            <div className="menu-card-title">Submit Lost Item</div>
            <div className="menu-card-desc">
              Report an item you have lost.
            </div>
          </div>

          {/* View Lost Items */}
          <div
            className="menu-card"
            onClick={() => navigate("/lost-item-list")}
          >
            <div className="menu-icon"><FaSearch /></div>
            <div className="menu-card-title">View Lost Items</div>
            <div className="menu-card-desc">
              Browse items reported as lost.
            </div>
          </div>

          {/* Submit Found Item */}
          <div
            className="menu-card"
            onClick={() => navigate("/found-item-form")}
          >
            <div className="menu-icon"><FaBoxOpen /></div>
            <div className="menu-card-title">Submit Found Item</div>
            <div className="menu-card-desc">
              Report an item you have found.
            </div>
          </div>

          {/* View Found Items */}
          <div
            className="menu-card"
            onClick={() => navigate("/found-item-list")}
          >
            <div className="menu-icon"><FaSearch /></div>
            <div className="menu-card-title">View Found Items</div>
            <div className="menu-card-desc">
              Browse items reported as found.
            </div>
          </div>

        </div>
      </Container>
    </>
  );
};

export default StudentMenu;
