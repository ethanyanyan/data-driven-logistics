import React from "react";
import { Button, Col, Container, Row, Nav} from "react-bootstrap";
import DataDrivenLogisticsNavbar from "../components/navigation/DataDrivenLogisticsNavbar";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';


export default function Dashboard(props) {

    const logout = useAuth(); 

    const handleLogout = () => {
    logout();
    }

    return <div>
        <DataDrivenLogisticsNavbar />
        <h1>Dashboard</h1>
        <Container>
            <Row>
                <Col xs={{span: 12, order: 'last'}} s={{span: 12, order: 'last'}} md={{span: 3, order: 'first'}} lg={{span: 3, order: 'first'}} xl={{span: 3, order: 'first'}}>
                    <Container>
                        <Row>
                            <h2>Quick Links</h2>
                        </Row>
                        {/* row for each quick access link. potential in the future 
                        to make this a sessionstorage pull, so that the quick links
                        can be adjusted by the user in settings. */}
                        <Row>
                            <Nav>
                                <Nav.Link as={Link} to="/shipment-tracking">Shipment Tracking</Nav.Link>
                            </Nav>
                        </Row>
                        <Row>
                            <Button onClick={handleLogout}>Logout</Button> {/* TODO: route to modal popup */}
                        </Row>
                    </Container>
                </Col>
                <Col xs={12} s={12} md={9} lg={9} xl={9}>
                    <Container>
                        <Row>
                            <Col xs={12} s={12} md={8} lg={8} xl={8}>
                                <h2>Real-Time Inventory Tracker</h2>
                            </Col>
                            <Col xs={6} s={6} md={1} lg={1} xl={1}>
                               <Button>Refresh</Button>
                            </Col>
                            <Col xs={6} s={6} md={3} lg={3} xl={3}>
                                <Button>Filter Data</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
}
