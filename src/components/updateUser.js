import React from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb,Form } from 'react-bootstrap';
import { FileEarmarkFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

function UpdateUser(props) {
    const dashboard = () => {
        props.history.push("/dashboard")
    }
    const page = () => {
        props.history.push("/pages")
    }
    const category = () => {
        props.history.push("/category")
    }
    const user = () => {
        props.history.push("/users")
    }
    return (
        <React.Fragment>
            <Navbar />
            <Container className='mt-4'>
                <Row>
                    <Col md={4}>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action onClick={dashboard}>Dashboard</ListGroup.Item>
                            <ListGroup.Item action  onClick={page}>Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}>Category</ListGroup.Item>
                            <ListGroup.Item action active onClick={user}>Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-2">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FileEarmarkFill></FileEarmarkFill>Users
                                </span>
                            </Col>
                            <Col md={6}>
                                <div style={{ float: "right" }}><Link to="/users/add"><Button variant="outline-primary"><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Users
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{color:"#1995dc"}}>Update User</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Full Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email Id" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Choose Group</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Admin</option>
                                    <option>Registered</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group style={{textAlign:"center"}}>
                            <Button variant="primary">Update User</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default UpdateUser;