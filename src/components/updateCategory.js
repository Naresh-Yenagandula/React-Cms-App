import React from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb,Form } from 'react-bootstrap';
import { FileEarmarkFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

function UpdateCategory(props) {
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
                            <ListGroup.Item action onClick={page}>Pages</ListGroup.Item>
                            <ListGroup.Item action active onClick={category}>Category</ListGroup.Item>
                            <ListGroup.Item action onClick={user}>Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-2">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FileEarmarkFill></FileEarmarkFill>Category
                                </span>
                            </Col>
                            <Col md={6}>
                                <div style={{ float: "right" }}><Link to="/pages/add"><Button variant="outline-primary"><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Pages
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{color:"#1995dc"}}>Update Category</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter Category" />
                            </Form.Group>
                            <Form.Group style={{textAlign:"center"}}>
                            <Button variant="primary">Update Category</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default UpdateCategory;