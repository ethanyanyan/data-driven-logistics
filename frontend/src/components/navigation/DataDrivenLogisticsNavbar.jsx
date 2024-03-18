import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.png'

export default function DataDrivenLogisticsNavbar(props) {
    return <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/dashboard">  
                <img
                    alt="Data Driven Logistics Logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Data Driven Logistics
            </Navbar.Brand>
        </Container>
        <Container className="navbar-quicklinks">
            This is a test.
        </Container>
    </Navbar>
}