import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaComments,
  FaSignOutAlt
} from "react-icons/fa";

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
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
            🛠 Lost & Found Admin
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
            Admin Dashboard
          </h1>
          <p className="menu-hero-sub">
            Manage students, items and system operations efficiently.
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <Container className="menu-content mt-4">
        <div className="menu-grid">

          {/* Student List */}
          <div
            className="menu-card"
            onClick={() => navigate("/student-list")}
          >
            <div className="menu-icon"><FaUsers /></div>
            <div className="menu-card-title">Student List</div>
            <div className="menu-card-desc">
              View and manage all registered students.
            </div>
          </div>
          <div
            className="menu-card"
            onClick={() => navigate("/student-report")}
          >
            <div className="menu-icon"><FaClipboardList /></div>
            <div className="menu-card-title">Student Report</div>
            <div className="menu-card-desc">
              Generate and view student reports.
            </div>
          </div>

          {/* Found Item List */}
          <div
            className="menu-card"
            onClick={() => navigate("/found-item-list")}
          >
            <div className="menu-icon"><FaBoxOpen /></div>
            <div className="menu-card-title">Found Item List</div>
            <div className="menu-card-desc">
              View all reported found items.
            </div>
          </div>

          {/* Lost Item List */}
          <div
            className="menu-card"
            onClick={() => navigate("/lost-item-list")}
          >
            <div className="menu-icon"><FaClipboardList /></div>
            <div className="menu-card-title">Lost Item List</div>
            <div className="menu-card-desc">
              View all reported lost items.
            </div>
          </div>

          {/* Match Item List */}
          <div
            className="menu-card"
            onClick={() => navigate("/match-item-list")}
          >
            <div className="menu-icon"><FaClipboardList /></div>
            <div className="menu-card-title">Match Item List</div>
            <div className="menu-card-desc">
              View matched lost and found items.
            </div>
          </div>

          {/* Chatting */}
          <div
            className="menu-card"
            onClick={() => navigate("/admin-chat")}
          >
            <div className="menu-icon"><FaComments /></div>
            <div className="menu-card-title">Chatting</div>
            <div className="menu-card-desc">
              Communicate with students in real-time.
            </div>
          </div>

        </div>
      </Container>
    </>
  );
};

export default AdminMenu;
