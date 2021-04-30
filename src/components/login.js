import React from 'react';
import { Container, Row, Col,Card,Button,Form } from 'react-bootstrap';

function Login() {
    return (
        <div style={{paddingTop:"10%"}}>
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} className="mt-4">
                        <Card className="text-center" style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <Form>
                            <Card.Header>DCX CMS</Card.Header>
                            <Card.Body>
                                    <Form.Group>
                                        <Form.Control type="email" placeholder="Enter your Email" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="password" placeholder="Enter Password" />
                                    </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button block>Sign In</Button>
                            </Card.Footer>
                        </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;