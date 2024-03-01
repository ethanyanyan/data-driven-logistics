import React from "react";
import { Button, Col, Container, Row} from "react-bootstrap";
import DataDrivenLogisticsNavbar from "../components/navigation/DataDrivenLogisticsNavbar";

export default function Dashboard(props) {
    return <div>
        <DataDrivenLogisticsNavbar />
        <h1>Dashboard</h1>
        <Container>
            <Row>
                <Col xs={{order:12}} s={{order:12}} lg={{order:12}}>
                    <Row>
                        <h2>future location of quicklinks</h2>
                    </Row>
                </Col>
                <Col>
                    <Container xs={12} s={12} m={6} lg={6} xl={6}>
                        <Row>
                            <Col xs={12} s={12} lg={4} xl={4}>
                                <h2>Real-Time Inventory Tracker</h2>
                            </Col>
                            <Col xs={12} s={12} lg={4} xl={4}>
                               <Button>Refresh</Button>
                            </Col>
                            <Col xs={12} s={12} lg={4} xl={4}>
                                <Button>Filter Data</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
}