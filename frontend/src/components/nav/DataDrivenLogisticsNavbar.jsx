import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png'

export default function DataDrivenLogisticsNavbar(props) {
    return <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand as={Link} to="/">
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
    </Navbar>
}