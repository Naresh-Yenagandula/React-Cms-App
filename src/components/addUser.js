import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { FileEarmarkFill, Speedometer, PeopleFill, FolderFill } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';

function AddUser(props) {

    const [userData, setUser] = useState({
        name: '',
        email: '',
        group: 'Registered'
    })
    const [error, setError] = useState({
        nameErrorMessage: '',
        emailErrorMessage: '',
        groupErroMessage: ''
    });

    const value = useContext(UserContext)
    const [message, setMessage] = useState();
    const [disable, setDisable] = useState({ email: true, name: true });

    const emailValidate = (e) => {
        let emailError = ""
        setUser({ ...userData, email: e.target.value })
        if (!e.target.value) {
            emailError = "Email is required"
            setDisable({ ...disable, email: true })

        } else if (!userData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            emailError = "Please enter a valid email"
            setDisable({ ...disable, email: true })
        } else {
            emailError = ""
            setDisable({ ...disable, email: false })

        }
        setError({ ...error, emailErrorMessage: emailError })
    }

    const nameValidate = (e) => {
        let nameError = ""
        setUser({ ...userData, name: e.target.value })
        if (!e.target.value) {
            nameError = "Full Name is Required"
            setDisable({ ...disable, name: true })

        } else if (!userData.name.match(/^[A-Za-z\s]*$/)) {
            nameError = "Full Name should contain only alphabets"
            setDisable({ ...disable, name: true })

        } else {
            nameError = ""
            setDisable({ ...disable, name: false })
        }
        setError({ ...error, nameErrorMessage: nameError })
    }


    const submitData = (e) => {
        e.preventDefault();
        if (!error.nameErrorMessage || !error.emailErrorMessage) {
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
                            <NavLink style={{ textDecoration: "none" }} to="/dashboard"><ListGroup.Item action><Speedometer></Speedometer> Dashboard</ListGroup.Item></NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="/pages"><ListGroup.Item action ><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item></NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="/category"><ListGroup.Item action ><FolderFill></FolderFill> Category</ListGroup.Item></NavLink>
                            {value.userRole === "Admin" ?
                                <NavLink style={{ textDecoration: "none" }} to="/users"><ListGroup.Item action active><PeopleFill></PeopleFill> Users</ListGroup.Item></NavLink> :
                                null}
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
                                        onChange={nameValidate}
                                        isInvalid={!!error.nameErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.nameErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="eg. example@domain.com"
                                        onChange={emailValidate}
                                        isInvalid={!!error.emailErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.emailErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                {/* <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Must contain atleast one Number,Uppercase, Lowercase & Special character"
                                        onChange={e => setUser({ ...userData, password: e.target.value })}
                                        isInvalid={!!error.passwordErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.passwordErrorMessage}</Form.Control.Feedback>
                                </Form.Group> */}
                                <Form.Group>
                                    <Form.Label>Choose Group</Form.Label>
                                    <Form.Control as="select" custom isInvalid={!!error.groupErrorMessage} onChange={e => setUser({ ...userData, group: e.target.value })}>
                                        <option>Registered</option>
                                        <option>Admin</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{error.groupErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit" disabled={disable.email || disable.name}>Add User</Button>
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