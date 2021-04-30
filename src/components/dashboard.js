import React from 'react';
import Navbar from '../components/navbar';
import {Container,Row,Col,ListGroup} from 'react-bootstrap';
import {Speedometer,FileEarmarkFill} from 'react-bootstrap-icons'

function Dashboard(props){
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
                            <ListGroup.Item action active onClick={dashboard}><Speedometer></Speedometer> Dashboard</ListGroup.Item>
                            <ListGroup.Item action onClick={page}><FileEarmarkFill></FileEarmarkFill> Pages</ListGroup.Item>
                            <ListGroup.Item action onClick={category}>Category</ListGroup.Item>
                            <ListGroup.Item action onClick={user}>Users</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default Dashboard;