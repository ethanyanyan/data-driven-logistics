import { Button, Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, AuthContext} from "../../contexts/AuthContext";
import { useEffect, useContext } from "react";
import "./DataDrivenLogisticsNavbar.css";

import logo from '../../assets/images/logo.png';


export default function DataDrivenLogisticsNavbar() {
  const { logout } = useAuth()
  
  const userData = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = sessionStorage.getItem('token') || "[]";
    console.log(currUser);
    }, [userData]);

    function handleShipmentsButtonClick() {
        navigate("/shipment-tracking");
    }

    function handlePeopleButtonClick() {
        navigate("/people");
    }

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          <Image
            alt="Data Driven Logistics Logo"
            src={logo}
            className="ddl-logo"
          />{' '}
        </Navbar.Brand>
        <Navbar.Text className="navbar-text-header">
            Data Driven Logistics
        </Navbar.Text>
        <Navbar.Toggle className="navbar-toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-collapse" id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Add any additional navigation links here.*/}
            <Button className="nav-button" variant="outline-light" onClick={handlePeopleButtonClick}> 
                People
            </Button>
            {/* Turn more of these into components. Add navigation into onclick link, remove nav methods */}
            <Button variant="outline-light" className="nav-button" onClick={handleShipmentsButtonClick}>
                Shipments
            </Button>
          </Nav>
          <Nav>
            <Button variant="outline-light" className="nav-button" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
