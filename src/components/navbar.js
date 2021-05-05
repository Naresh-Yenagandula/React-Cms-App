import React from 'react';
import { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

function Navbars() {
    const value = useContext(UserContext)
    const logout = () => {
        localStorage.removeItem('token')
        value.isAuth = false
        value.userName = ""
        value.userRole = ""
    }
    return (
        <React.Fragment >
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#1995dc" }} variant="dark">
                <Navbar.Brand>DCX CMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {value.userRole === "Admin" ?
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/dashboard">Dashboard</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/pages">Pages</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/category">Categories</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/users">Users</NavLink>
                        </Nav> :
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/dashboard">Dashboard</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/pages">Pages</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-link active" to="/category">Categories</NavLink>
                        </Nav>
                    }
                    <Navbar.Text>
                        <span>{value.userName} </span>
                        <NavLink to="#" onClick={logout}>Logout</NavLink>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment >
    )
}

export default Navbars;