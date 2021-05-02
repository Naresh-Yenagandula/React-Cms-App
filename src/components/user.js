
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb,Table,Alert, Spinner, Modal } from 'react-bootstrap';
import { Speedometer,FolderFill,PeopleFill,FileEarmarkFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User(props) {

    const [userData, setData] = useState([])
    const [message, setMessage] = useState()
    const [isLoading, setLoading] = useState(true)
    const [smShow, setSmShow] = useState({ view: false, id: '', message: '' });

    useEffect(() => {
        axios.get("http://localhost:8081/api/user/0")
            .then((result) => {
                setLoading(false)
                if (result.data.result[0]) {
                    setData(result.data.result)
                } else {
                    setMessage({ message: "No Data", variant: "" })
                }
            })
            .catch((err) => {
                setMessage({ message: "Something went wrong", variant: "danger" })
                setLoading(false)
            })
    }, [])

    const deleteUser = (id) => {
        setSmShow({ view: true, message: "Deleting..." })
        axios.delete("http://localhost:8081/api/users/" + id)
            .then((result) => {
                setData(userData.filter(user => user._id !== id));
                setSmShow({ view: true, message: "User Deleted SuccessFully" })
            })
            .catch((err) => {
                console.log(err);
            })
    }

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
    const update = () =>{
        props.history.push('/users/update')
    }
    return (
        <React.Fragment>
            <Navbar />
            <Modal
                size="sm"
                show={smShow.view}
                onHide={() => setSmShow({ view: false })}
                animation={false}
                centered
                aria-labelledby="example-modal-sizes-title-sm"
            >
                {smShow.message ?
                    <Modal.Header closeButton>
                        {smShow.message}
                    </Modal.Header> :
                    <React.Fragment>
                        <Modal.Header closeButton>
                            Are you sure you want to delete this User?
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="danger" size="sm" onClick={() => { deleteUser(smShow.id) }}>Delete</Button>
                            <Button variant="warning" size="sm" onClick={() => { setSmShow({ view: false, id: '', message: '' }) }}>Cancel</Button>
                        </Modal.Footer>
                    </React.Fragment>
                }
            </Modal>
            <Container className='mt-4'>
                <Row>
                    <Col md={4}>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action onClick={dashboard}>Dashboard</ListGroup.Item>
                            <ListGroup.Item action onClick={page}>Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}>Category</ListGroup.Item>
                            <ListGroup.Item action active onClick={user}>Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-4">
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
                        {isLoading ?
                          <Row>
                          <Col md={{ span: 6, offset: 5 }}><Spinner animation="border" /></Col>
                          </Row> :
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Group</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {message ?
                                    <tbody><tr><td colSpan="5" className="text-center"><Alert variant={message.variant}>{message.message}</Alert></td></tr></tbody> :
                                    <tbody>
                                        {userData.map((user) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.group}</td>
                                                    <td><Link to={`users/update/${user._id}`}><Button size="sm" variant="outline-info"><PencilSquare></PencilSquare></Button></Link></td>
                                                    <td><Button variant="outline-danger" onClick={() => setSmShow({ view: true, id: `${user._id}`, message: '' })} size="sm"><TrashFill></TrashFill></Button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                }
                        </Table>
                       }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default User;