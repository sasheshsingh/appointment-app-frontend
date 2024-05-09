import React, {useState, useContext} from "react"
import {Navbar, Nav, Form, FormControl, Button, Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {PatientContext} from '../PatientContext'

const NavBar = () => {
    const [patients, setPatients] = useContext(PatientContext)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };
   return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Patient Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav>
                {isLoggedIn ? (<Button onClick={handleLogout} variant="outline-primary" className="ml-2">Logout</Button>): ""}
            </Nav>
            {/*<Navbar.Collapse id="basic-navbar-nav">*/}
            {/*    <Nav className="mr-auto">*/}
            {/*        {isLoggedIn && (*/}
            {/*            <React.Fragment>*/}
            {/*                <Nav.Item>*/}
            {/*                    <Badge className="mt-2" variant="primary">Patients Added {patients.data.length}</Badge>*/}
            {/*                </Nav.Item>*/}
            {/*                <Nav.Item>*/}
            {/*                    <Link to="/addproduct" className="nav-link">Add Patient</Link>*/}
            {/*                </Nav.Item>*/}
            {/*            </React.Fragment>*/}
            {/*        )}*/}
            {/*    </Nav>*/}
            {/*    <Form inline>*/}
            {/*        <FormControl type="text" placeholder="Search" className="mr-sm-9" />*/}
            {/*        <Button type="submit" variant="outline-primary">Search</Button>*/}
            {/*    </Form>*/}
            {/*    {isLoggedIn ? (*/}
            {/*        <Button onClick={handleLogout} variant="outline-primary" className="ml-2">Logout</Button>*/}
            {/*    ) : (*/}
            {/*        <Link to="/login" className="btn btn-primary ml-2">Login</Link>*/}
            {/*    )}*/}
            {/*</Navbar.Collapse>*/}
        </Navbar>
    );
};

export default NavBar;