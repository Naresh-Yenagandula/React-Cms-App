import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Table, Button, Spinner } from 'react-bootstrap';
import { Speedometer, FileEarmarkFill, FolderFill, PeopleFill } from 'react-bootstrap-icons'
import axios from 'axios';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../App';

function Dashboard(props) {
    const [pageData, setPage] = useState([]);
    const [userData, setUser] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [messagePage, setMessagePage] = useState("")
    const [messageUser, setMessageUser] = useState("")
    const value = useContext(UserContext)

    const getPages = () => {
        axios.get("http://localhost:8081/api/pages")
            .then((result) => {
                setLoading(false)
                setMessagePage("")
                if (result.data[0]) {
                    setPage(result.data)
                } else {
                    setMessagePage("No Data")
                }

            })
            .catch((err) => {
                setLoading(false)
                setMessagePage("Something went wrong")
            })
    }

    const getUsers = () => {
        axios.get("http://localhost:8081/api/users")
            .then((result) => {
                setLoading(false)
                setMessageUser("")
                if (result.data[0]) {
                    setUser(result.data)
                } else {
                    setMessageUser("No Data")
                }
            })
            .catch((err) => {
                setLoading(false)
                setMessageUser("Something went Wrong")
            })
    }

    useEffect(() => {
        if (!value.isAuth && !value.isLoading) {
            props.history.push('/login')
            return false
        }
        // console.log(isAuth,isAuthLoading);
        getPages()
        getUsers()
    }, [value, props])

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
            <Container className='mt-4 mb-4'>
                <Row>
                    <Col md={4}>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action active onClick={dashboard}><Speedometer></Speedometer> Dashboard</ListGroup.Item>
                            <ListGroup.Item action onClick={page}><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}><FolderFill></FolderFill> Category</ListGroup.Item>
                            {value.userRole==="Admin"?
                            <ListGroup.Item action onClick={user}><PeopleFill></PeopleFill> Users</ListGroup.Item>:
                            null}
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <Speedometer></Speedometer> Dashboard
                                </span>
                            </Col>
                            <Col md={6}>
                            </Col>
                        </Row><hr />
                        <h4 className="lead" style={{ color: "#1995dc" }}><b>Latest Pages</b></h4>
                        {isLoading ?
                            <Spinner animation="border" /> :
                            <Table size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>Page Title</th>
                                        <th>Category</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>
                                {messagePage ?
                                    <tbody><tr><td colSpan="3" className="text-center">{messagePage}</td></tr></tbody> :
                                    <tbody>
                                        {pageData.map((page, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{page.title}</td>
                                                    <td>{page.category}</td>
                                                    <td>{page.author}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                }
                            </Table>
                        }<br />
                        <Button title="pages" variant="outline-primary" disabled={messagePage}>View All Pages</Button>
                        {value.userRole==="Admin"?
                        <>
                        <hr />
                        <h4 className="lead" style={{ color: "#1995dc" }}><b>Latest Users</b></h4>
                        {isLoading ?
                            <Spinner animation="border" /> :
                            <Table size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Group</th>
                                    </tr>
                                </thead>
                                {messageUser ?
                                    <tbody><tr><td colSpan="3" className="text-center">{messageUser}</td></tr></tbody> :
                                    <tbody>
                                        {userData.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.group}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                }
                            </Table>
                        }
                        <br />
                        <Button title="users" variant="outline-primary" disabled={messageUser}>View All Users</Button>
                        </>:
                        null}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default Dashboard;