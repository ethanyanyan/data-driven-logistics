import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/images/logo.png';
import "./DataDrivenLogisticsNavbar.css";
import BaseBtn from "./../BaseComponents/BaseBtn";

export default function DataDrivenLogisticsNavbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const showPeopleTab = user && [1, 2, 4].includes(user.RoleID);
  const navigationLinks = [
    { path: "/shipment-tracking", name: "Shipments" },
    // Conditionally add "People" tab based on the user's role
    ...(showPeopleTab ? [{ path: "/users", name: "People" }] : []),
    { action: logout, name: "Logout" },
    // Add more links as needed
  ];

  // Custom function to handle navigation or actions
  const handleNavClick = (link) => {
    if (link.path) {
      navigate(link.path);
    } else if (link.action) {
      link.action();
    }
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/dashboard">
          <Image alt="Data Driven Logistics Logo" src={logo} className="ddl-logo" />
        </Navbar.Brand>
        <Navbar.Text className="navbar-text-header">
          Data Driven Logistics
        </Navbar.Text>
        <Navbar.Toggle className="navbar-toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-collapse">
          <Nav className="ms-auto">
            {navigationLinks.map((link, index) => (
              <BaseBtn
                key={index}
                onClick={() => handleNavClick(link)}
                label={link.name}
                btnType="primary"
                size="sm"
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
