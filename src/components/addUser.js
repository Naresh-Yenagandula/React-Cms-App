import React from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { FileEarmarkFill,Speedometer,PeopleFill,FolderFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AddUser(props) {

    const [userData, setUser] = useState({
        name: '',
        email: '',
        password: '',
        group: ''
    })
    const [error, setError] = useState({
        nameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        groupErroMessage: ''
    });

    const [message, setMessage] = useState();

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
        let nameError, emailError, passwordError, groupError = "";

        if (!userData.name) {
            nameError = "Full Name is Required"
        } else if (!userData.name.match(/^[A-Za-z\s]*$/)) {
            nameError = "Full Name should contain only alphabets"
        }

        if (!userData.email) {
            emailError = "Email is required"
        } else if (!userData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            emailError = "Please enter a valid email"
        }

        if (!userData.password) {
            passwordError = "Password is Required"
        } else if (!userData.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$]).{8,}/)) {
            passwordError = "Password should be alpha-numeric"
        }

        if (!userData.group || userData.group === "Choose...") {
            groupError = "Please select a group"
        }

        if (nameError || emailError || passwordError || groupError) {
            setError({ nameErrorMessage: nameError, emailErrorMessage: emailError, passwordErrorMessage: passwordError, groupErrorMessage: groupError })
            return false
        }
        return true

    }

    const submitData = (e) => {
        e.preventDefault();
        const isValid = validate();
        console.log(isValid);
        if (isValid) {
            console.log(userData);
            setError("")
            axios.post("http://localhost:8081/authApi/register", userData)
                .then((result) => {
                    setMessage({ message: "User Added Successfully", variant: "success" })
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
                            <ListGroup.Item action onClick={category}><FolderFill></FolderFill> Category</ListGroup.Item>
                            <ListGroup.Item action active onClick={user}><PeopleFill></PeopleFill> Users</ListGroup.Item>
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
                                <div style={{ float: "right" }}><Link to="/users/add"><Button variant="outline-primary" onClick={e => setMessage("")}><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Users
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{ color: "#1995dc" }}>Add User</h4>
                        {message ?
                            <Alert variant={message.variant}>{message.message}</Alert> :
                            <Form onSubmit={submitData}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Full Name"
                                        onChange={e => setUser({ ...userData, name: e.target.value })}
                                        isInvalid={!!error.nameErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.nameErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Email Id"
                                        onChange={e => setUser({ ...userData, email: e.target.value })}
                                        isInvalid={!!error.emailErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.emailErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Password"
                                        onChange={e => setUser({ ...userData, password: e.target.value })}
                                        isInvalid={!!error.passwordErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.passwordErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose Group</Form.Label>
                                    <Form.Control as="select" custom isInvalid={!!error.groupErrorMessage} onChange={e => setUser({ ...userData, group: e.target.value })}>
                                        <option>Choose...</option>
                                        <option>Admin</option>
                                        <option>Registered</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{error.groupErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit">Add User</Button>
                                </Form.Group>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default AddUser;