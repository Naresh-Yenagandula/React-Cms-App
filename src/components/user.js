import React from 'react';
import Navbar from '../components/navbar';
import {Container,Row,Col,ListGroup} from 'react-bootstrap';

function User(props){
    const dashboard=()=> {
        props.history.push("/dashboard")
      }
    const page=()=> {
        props.history.push("/pages")
      }
    const category=()=> {
        props.history.push("/categories")
      }
    const user=()=> {
        props.history.push("/users")
      }
    return(
        <React.Fragment>
            <Navbar />
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
                    <Col md={8}>
                      
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default User;