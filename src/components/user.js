import Navbar from '../components/navbar';
import { Container, Row, Col, ListGroup, Button, Breadcrumb, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import { Speedometer, FolderFill, PeopleFill, FileEarmarkFill, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useContext } from 'react';
import { UserContext } from '../App';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function User(props) {

    const [userData, setData] = useState([])
    const [message, setMessage] = useState()
    const [isLoading, setLoading] = useState(true)
    const [smShow, setSmShow] = useState({ view: false, id: '', message: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [dataLength, setLength] = useState(0);
    const pageLimit = 5
    const offset = currentPage * pageLimit;
    const pageCount = Math.ceil(dataLength / pageLimit)
    const value = useContext(UserContext)
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    useEffect(() => {
        if (!value.isAuth && !value.isLoading) {
            props.history.push('/login')
            return false
        }
        axios.get("http://localhost:8081/api/users/" + offset)
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
    }, [offset, props, value])

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

    const pageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const excelExport = () => {
        axios.get("http://localhost:8081/api/allUsers")
            .then((result) => {
                const ws = XLSX.utils.json_to_sheet(result.data);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, "UserAllData" + fileExtension);
            })
            .catch((err)=>{
                console.log("err in excel");
            })
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
                            <NavLink style={{ textDecoration: "none" }} to="/dashboard"><ListGroup.Item action><Speedometer></Speedometer> Dashboard</ListGroup.Item></NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="/pages"><ListGroup.Item action ><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item></NavLink>
                            <NavLink style={{ textDecoration: "none" }} to="/category"><ListGroup.Item action ><FolderFill></FolderFill> Category</ListGroup.Item></NavLink>
                            {value.userRole === "Admin" ?
                                <NavLink style={{ textDecoration: "none" }} to="/users"><ListGroup.Item action active><PeopleFill></PeopleFill> Users</ListGroup.Item></NavLink> :
                                null}
                        </ListGroup>
                    </Col>
                    <Col md={8} className="mt-4">
                        <Row>
                            <Col md={6}>
                                <span className="page-header" style={{ fontSize: "35px", color: "#1995dc" }}>
                                    <PeopleFill></PeopleFill> Users
                                </span>
                            </Col>
                            <Col md={6}>
                                <div style={{ float: "right" }}>
                                    <Link to="/users/add"><Button variant="outline-primary"><b>New</b></Button></Link>{" "}
                                    <Button variant="outline-primary" onClick={excelExport}>Export Users</Button>
                                </div>
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
                            <React.Fragment>
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
                                <ReactPaginate
                                    previousLabel={"Prev"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={pageChange}
                                    containerClassName={"pagination pagination-sm justify-content-center"}
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
export default User;