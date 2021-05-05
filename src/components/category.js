import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Table, Alert, Modal, Spinner } from 'react-bootstrap';
import { Speedometer, FileEarmarkFill, FolderFill, PeopleFill,TrashFill,PencilSquare } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../App';

function Category(props) {
    const [categoryData, setData] = useState([])
    const [message, setMessage] = useState()
    const [isLoading, setLoading] = useState(true)
    const [smShow, setSmShow] = useState({ view: false, id: '', message: '' });
    const value=useContext(UserContext)

    useEffect(() => {
        if(!value.isAuth && !value.isLoading){
            props.history.push('/login')
            return false
        }
        axios.get("http://localhost:8081/api/categories/0")
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
    }, [props,value])
    const deleteCategory = (id) => {
        setSmShow({ view: true, message: "Deleting..." })
        axios.delete("http://localhost:8081/api/categories/" + id)
            .then((result) => {
                setData(categoryData.filter(category => category._id !== id));
                setSmShow({ view: true, message: "Category Deleted SuccessFully" })
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
                            Are you sure you want to delete this Category?
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="danger" size="sm" onClick={() => { deleteCategory(smShow.id) }}>Delete</Button>
                            <Button variant="warning" size="sm" onClick={() => { setSmShow({ view: false, id: '', message: '' }) }}>Cancel</Button>
                        </Modal.Footer>
                    </React.Fragment>
                }
            </Modal>
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
                    <Col md={8} className="mt-4">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FolderFill></FolderFill> Category
                                </span>
                            </Col>
                            <Col md={6}>
                                <div style={{ float: "right" }}><Link to="/category/add"><Button variant="outline-primary"><b>New</b></Button></Link></div>
                            </Col>
                        </Row><hr />
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Category
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        {isLoading ?
                            <Row>
                                <Col md={{ span: 6, offset: 5 }}><Spinner animation="border" /></Col>
                            </Row> :
                            <Table hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Category Title</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {message ?
                                    <tbody><tr><td colSpan="5"><Alert variant={message.variant}>{message.message}</Alert></td></tr></tbody> :
                                    <tbody>
                                        {categoryData.map((category) => {
                                            return (
                                                <tr key={category._id}>
                                                    <td>{category.title}</td>
                                                    <td><Link to={`category/update/${category._id}`}><Button variant="outline-info" size="sm"><PencilSquare></PencilSquare></Button></Link></td>
                                                    <td><Button variant="outline-danger" onClick={() => setSmShow({ view: true, id: `${category._id}`, message: '' })} size="sm"><TrashFill></TrashFill></Button></td>
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
export default Category;