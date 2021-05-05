import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { FileEarmarkFill,Speedometer,PeopleFill,FolderFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App';

function UpdatePage(props) {
    const [pageData, setPage] = useState({
        title: '',
        category: '',
        author: ''
    })

    const [error, setError] = useState({
        titleErrorMessage: '',
    });

    const [message, setMessage] = useState();

    const value=useContext(UserContext)

    useEffect(() => {
        axios.get("http://localhost:8081/api/page/" + props.match.params.id)
            .then((result) => {
                setPage(result.data)
            })
            .catch((err) => {
                setMessage({ message: "Something went Wrong", variant: "danger" })
            })
    }, [props])

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

        if (!pageData.title) {
            titleError = "Title is Required"
        } else if (!pageData.title.match(/^[A-Za-z\s]*$/)) {
            titleError = "Title should contain only alphabets"
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
            axios.put("http://localhost:8081/api/pages/" + pageData._id, pageData)
                .then((result) => {
                    setMessage({ message: "Page Updated Successfully", variant: "success" })
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
                            <ListGroup.Item action active onClick={page}><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}><FolderFill></FolderFill> Category</ListGroup.Item>
                            {value.userRole==="Admin"?
                            <ListGroup.Item action onClick={user}><PeopleFill></PeopleFill> Users</ListGroup.Item>:
                            null}
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-2">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FileEarmarkFill></FileEarmarkFill>Pages
                                </span>
                            </Col>
                            <Col md={6}>
                                <div style={{ float: "right" }}><Link to="/pages/add"><Button variant="outline-primary" onClick={e => setMessage("")}><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Pages
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{ color: "#1995dc" }}>Update Page</h4>
                        {message ?
                            <Alert variant={message.variant}>{message.message}</Alert> :
                            <Form onSubmit={submitData}>
                                <Form.Group>
                                    <Form.Label>Page Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Page Title"
                                        value={pageData.title}
                                        onChange={e => setPage({ ...pageData, title: e.target.value })}
                                        isInvalid={!!error.titleErrorMessage}
                                    />
                                    <Form.Control.Feedback type='invalid'>{error.titleErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose Category</Form.Label>
                                    <Form.Control as="select" value={pageData.category} custom onChange={e => setPage({ ...pageData, category: e.target.value })}>
                                        <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{error.categoryErrorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose Author</Form.Label>
                                    <Form.Control as="select" value={pageData.author} custom onChange={e => setPage({ ...pageData, author: e.target.value })}>
                                        <option>author 1</option>
                                        <option>Author 2</option>
                                        <option>Author 3</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{error.authorErroMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit">Update Page</Button>
                                </Form.Group>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default UpdatePage;