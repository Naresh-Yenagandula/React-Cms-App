import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Table, Spinner, Alert, Modal } from 'react-bootstrap';
import { FileEarmarkFill, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Page(props) {
    const [pageData, setData] = useState([])
    const [message, setMessage] = useState()
    const [isLoading, setLoading] = useState(true)
    const [smShow, setSmShow] = useState({ view: false, id: '', message: '' });

    useEffect(() => {
        axios.get("http://localhost:8081/api/pages/0")
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

    const deletePage = (id) => {
        setSmShow({view:true,message:"Deleting..."})
        axios.delete("http://localhost:8081/api/pages/" + id)
            .then((result) => {
                setData(pageData.filter(page => page._id !== id));
                setSmShow({ view: true, message: "Page Deleted SuccessFully" })
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
                            Are you sure you want to delete this Page?
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="danger" size="sm" onClick={() => { deletePage(smShow.id) }}>Delete</Button>
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
                            <ListGroup.Item action active onClick={page}>Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}>Category</ListGroup.Item>
                            <ListGroup.Item action onClick={user}>Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-4">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FileEarmarkFill></FileEarmarkFill>Pages
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
                        {isLoading ?
                            <Row>
                                <Col md={{span:6,offset:5}}><Spinner animation="border" /></Col>
                            </Row> :
                            <Table hover size="sm" className="text-center">
                                <thead>
                                    <tr>
                                        <th>Page title</th>
                                        <th>Category</th>
                                        <th>Author</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {message ?
                                    <tbody><tr><td colSpan="5"><Alert variant={message.variant}>{message.message}</Alert></td></tr></tbody> :
                                    <tbody>
                                        {pageData.map((page) => {
                                            return (
                                                <tr key={page._id}>
                                                    <td>{page.title}</td>
                                                    <td>{page.category}</td>
                                                    <td>{page.author}</td>
                                                    <td><Link to={`pages/update/${page._id}`}><Button size="sm" aria-label="update"><PencilSquare></PencilSquare></Button></Link></td>
                                                    <td><Button variant="danger" aria-label="delete" onClick={() => setSmShow({ view: true, id: `${page._id}`, message: '' })} size="sm"><TrashFill></TrashFill></Button></td>
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
export default Page;