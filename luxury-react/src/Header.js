import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function HeaderComponent(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Brand Name</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Dashboard</Nav.Link>
                <Nav.Link href="#pricing">Marketplace</Nav.Link>
            </Nav>
        </Navbar>
        </div>
    );
}
export default HeaderComponent;