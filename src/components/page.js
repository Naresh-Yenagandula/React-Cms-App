import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import { Speedometer, FileEarmarkFill, FolderFill, PeopleFill, TrashFill, PencilSquare } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Page(props) {
    const [pageData, setData] = useState([])
    const [message, setMessage] = useState()
    const [isLoading, setLoading] = useState(true)
    const [smShow, setSmShow] = useState({ view: false, id: '', message: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [dataLength, setLength] = useState(0);
    const pageLimit = 5
    const offset = currentPage * pageLimit;
    const pageCount = Math.ceil(dataLength / pageLimit)

    useEffect(() => {
        axios.get("http://localhost:8081/api/pages/" + offset)
            .then((result) => {
                setLoading(false)
                if (result.data.result[0]) {
                    setLength(result.data.no)
                    setData(result.data.result)
                } else {
                    setMessage({ message: "No Data", variant: "" })
                }
            })
            .catch((err) => {
                setMessage({ message: "Something went wrong", variant: "danger" })
                setLoading(false)
            })
    }, [offset])

    const deletePage = (id) => {
        setSmShow({ view: true, message: "Deleting..." })
        axios.delete("http://localhost:8081/api/pages/" + id)
            .then((result) => {
                setData(pageData.filter(page => page._id !== id));
                setSmShow({ view: true, message: "Page Deleted SuccessFully" })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const pageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
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
                            <ListGroup.Item action onClick={dashboard}><Speedometer></Speedometer> Dashboard</ListGroup.Item>
                            <ListGroup.Item action active onClick={page}><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}><FolderFill></FolderFill> Category</ListGroup.Item>
                            <ListGroup.Item action onClick={user}><PeopleFill></PeopleFill> Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-4">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <FileEarmarkFill></FileEarmarkFill> Pages
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
                                <Col md={{ span: 6, offset: 5 }}><Spinner animation="border" /></Col>
                            </Row> :
                            <React.Fragment>
                                <Table hover size="sm">
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
                                        <tbody><tr><td colSpan="5" className="text-center"><Alert variant={message.variant}>{message.message}</Alert></td></tr></tbody> :
                                        <tbody>
                                            {pageData.map((page) => {
                                                return (
                                                    <tr key={page._id}>
                                                        <td>{page.title}</td>
                                                        <td>{page.category}</td>
                                                        <td>{page.author}</td>
                                                        <td><Link to={`pages/update/${page._id}`}><Button variant="outline-info" size="sm" aria-label="update"><PencilSquare></PencilSquare></Button></Link></td>
                                                        <td><Button variant="outline-danger" aria-label="delete" onClick={() => setSmShow({ view: true, id: `${page._id}`, message: '' })} size="sm"><TrashFill></TrashFill></Button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    }
                                </Table>
                                <ReactPaginate
                                    previousLabel={"Prev"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={pageChange}
                                    containerClassName={"pagination pagination-sm justify-content-end"}
                                    pageLinkClassName={"page-link"}
                                    previousLinkClassName={"page-link"}
                                    nextLinkClassName={"page-link"}
                                    disabledClassName={"page-item disabled"}
                                    activeClassName={"page-item active"}
                                />
                            </React.Fragment>
                        }

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default Page;