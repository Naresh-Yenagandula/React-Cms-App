import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbars() {
    const styles = {
        float: "left",
        display: "block",
        color: "white",
        textAlign: "center",
        paddingRight:"10px",
        textDecoration: "none",
        ':hover': {
            color: "black"
        }
    }
    return(
        <React.Fragment >
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"#1995dc"}} variant="dark">
                <Navbar.Brand>DCX CMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link style={styles} to="/dashboard">Dashboard</Link>
                        <Link style={styles} to="/pages">Pages</Link>
                        <Link style={styles} to="/categories">Categories</Link>
                        <Link style={styles} to="/users">Users</Link>
                    </Nav>
                    <Navbar.Text>
                        <Link to="" style={styles}>Logout</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment >
    )
}

export default Navbars;