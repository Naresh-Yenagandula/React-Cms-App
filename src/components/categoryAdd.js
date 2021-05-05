import React from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { FileEarmarkFill,Speedometer,PeopleFill,FolderFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App';

function AddCategory(props) {
    const [categoryData, setCategory] = useState({
        title: ''
    })
    const [error, setError] = useState({
        titleErrorMessage: ''
    });
    const [message, setMessage] = useState();

    const value=useContext(UserContext)

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

    const validate = () => {
        let titleError = "";
        if (!categoryData.title) {
            titleError = "Title is required"
        }
        if (titleError) {
            setError({ titleErrorMessage: titleError })
            return false
        }
        return true
    }
    const submitData = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setError("")
            axios.post("http://localhost:8081/api/categories", categoryData)
                .then((result) => {
                    setMessage({ message: "Category Added Successfully", variant: "success" })
                })
                .catch((err) => {
                    setMessage({ message: "Something went wrong", variant: "danger" })
                })
        }
    }
    return (
        <React.Fragment>
            <Navbar />
            <Container className='mt-4'>
                <Row>
                    <Col md={4}>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action onClick={dashboard}><Speedometer></Speedometer> Dashboard</ListGroup.Item>
                            <ListGroup.Item action onClick={page}><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item>
                            <ListGroup.Item action active onClick={category}><FolderFill></FolderFill> Category</ListGroup.Item>
                            {value.userRole==="Admin"?
                            <ListGroup.Item action onClick={user}><PeopleFill></PeopleFill> Users</ListGroup.Item>:
                            null}
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
                                <div style={{ float: "right" }}><Link to="/category/add"><Button variant="outline-primary" onClick={e => setMessage("")}><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Category
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{ color: "#1995dc" }}>Add Category</h4>
                        {message ?
                            <Alert variant={message.variant}>{message.message}</Alert> :
                            <Form onSubmit={submitData}>
                                <Form.Group>
                                    <Form.Label>Category Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Category"
                                        onChange={e => setCategory({ ...categoryData, title: e.target.value })}
                                        isInvalid={!!error.titleErrorMessage} />
                                    <Form.Control.Feedback type='invalid'>{error.titleErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit">Add Category</Button>
                                </Form.Group>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default AddCategory;