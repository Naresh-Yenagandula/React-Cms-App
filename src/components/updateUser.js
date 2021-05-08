import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { FileEarmarkFill, Speedometer, PeopleFill, FolderFill } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App';

function UpdateUser(props) {
    const [userData, setUser] = useState({
        name: '',
        email: '',
        group: ''
    })

    const [error, setError] = useState({
        nameErrorMessage: '',
        emailErrorMessage: '',
        groupErroMessage: ''
    });

    const value = useContext(UserContext)

    useEffect(() => {
        axios.get("http://localhost:8081/api/user/" + props.match.params.id)
            .then((result) => {
                setUser(result.data)
            })
            .catch((err) => {
                setMessage({ message: "Something went Wrong", variant: "danger" })
            })
    }, [props])

    const [message, setMessage] = useState();


    const validate = () => {
        let nameError, emailError, groupError = "";

        if (!userData.name) {
            nameError = "Full Name is Required"
        } else if (!userData.name.match(/[a-zA-Z\s]+$/)) {
            nameError = "Full Name should contain only alphabets"
        }

        if (!userData.email) {
            emailError = "Email is required"
        } else if (!userData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            emailError = "Please enter a valid email"
        }

        if (!userData.group || userData.group === "Choose...") {
            groupError = "Please select a group"
        }

        if (nameError || emailError || groupError) {
            setError({ nameErrorMessage: nameError, emailErrorMessage: emailError, groupErrorMessage: groupError })
            return false
        }
        return true

    }

    const submitData = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setError("")
            axios.put("http://localhost:8081/api/users/" + userData._id, userData)
                .then((result) => {
                    setMessage({ message: "User Updated Successfully", variant: "success" })
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
                            <NavLink style={{textDecoration:"none"}} to="/dashboard"><ListGroup.Item action><Speedometer></Speedometer> Dashboard</ListGroup.Item></NavLink>
                            <NavLink style={{textDecoration:"none"}} to="/pages"><ListGroup.Item action ><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item></NavLink>
                            <NavLink style={{textDecoration:"none"}} to="/category"><ListGroup.Item action ><FolderFill></FolderFill> Category</ListGroup.Item></NavLink>
                            {value.userRole === "Admin" ?
                                <NavLink style={{textDecoration:"none"}} to="/users"><ListGroup.Item action active><PeopleFill></PeopleFill> Users</ListGroup.Item></NavLink> :
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
                                <div style={{ float: "right" }}><Link to="/users/add"><Button variant="outline-primary" ><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Users
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{ color: "#1995dc" }}>Update User</h4>
                        {message ?
                            <Alert variant={message.variant}>{message.message}</Alert> :
                            <Form onSubmit={submitData}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Full Name"
                                        value={userData.name}
                                        onChange={e => setUser({ ...userData, name: e.target.value })}
                                        isInvalid={!!error.nameErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.nameErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="eg. example@domain.com"
                                        value={userData.email}
                                        onChange={e => setUser({ ...userData, email: e.target.value })}
                                        isInvalid={!!error.emailErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.emailErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose Group</Form.Label>
                                    <Form.Control as="select" value={userData.group} custom isInvalid={!!error.groupErrorMessage} onChange={e => setUser({ ...userData, group: e.target.value })}>
                                        <option>Choose...</option>
                                        <option>Admin</option>
                                        <option>Registered</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{error.groupErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit">Update User</Button>
                                </Form.Group>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default UpdateUser;