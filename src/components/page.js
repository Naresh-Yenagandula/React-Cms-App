import React, { useState,useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb,Table,Spinner } from 'react-bootstrap';
import { FileEarmarkFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Page(props) {
    const [pageData,setData]  =useState([])
    const [message,setMessage] = useState()
    const [isLoading,setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:8081/api/pages/0")
        .then((result)=>{
            setData(result.data.result)
            setLoading(false)
        })
        .catch((err)=>{
            setMessage({message:"Something went wrong",variant:"danger"})
            setLoading(false)
        })
    }, [])

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
                            {isLoading?
                            <Spinner animation="border" />:
                            <tbody>
                                {pageData.map((page)=>{
                                    return(
                                    <tr key={page._id}>
                                        <td>{page.title}</td>
                                        <td>{page.category}</td>
                                        <td>{page.author}</td>
                                        <td><Link to={`pages/update/${page._id}`}><Button size="sm"><PencilSquare></PencilSquare></Button></Link></td>
                                        <td><Button size="sm"><TrashFill></TrashFill></Button></td>
                                    </tr>
                                    )
                                })}
                            </tbody>
}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default Page;