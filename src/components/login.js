import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';

function Login(){
    return(
        <div style={{backgroundColor:"#1995dc"}}>
            <Container>
                <Row>
                    <Col md={4}>sidebar</Col>
                    <Col md={4}>
                        operations
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;