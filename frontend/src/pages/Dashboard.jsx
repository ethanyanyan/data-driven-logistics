import React from "react";
import { Button, Col, Container, Row, Nav } from "react-bootstrap";
import DataDrivenLogisticsNavbar from "../components/navigation/DataDrivenLogisticsNavbar";
import { Link } from "react-router-dom";


export default function Dashboard(props) {


  return (
    <div>
      <DataDrivenLogisticsNavbar />
      <h1>Dashboard</h1>
      <Container>
        <Row>
          <Col xs={{span: 12, order: 'last'}} s={{span: 12, order: 'last'}} md={{span: 3, order: 'first'}} lg={{span: 3, order: 'first'}} xl={{span: 3, order: 'first'}}>
            <Container>
              <Row>
                <h2>Quick Links</h2>
              </Row>
              <Row>
                <Nav>
                  <Nav.Link as={Link} to="/shipment-tracking">Shipment Tracking</Nav.Link>
                </Nav>
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
  );
}
