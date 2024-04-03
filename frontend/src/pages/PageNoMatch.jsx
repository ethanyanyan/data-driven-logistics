import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PageNoMatch(props) {

    return (
        <Container>
            <h2>That's a 404.</h2>
            <p>This page does not exist.</p>
            <p>
                <Link to="/">Back to safety.</Link>
            </p>
        </Container>
    );
}