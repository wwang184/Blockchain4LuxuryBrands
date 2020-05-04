import React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

function HeaderComponent(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Luxury Goods</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
        </Navbar>
        </div>
    );
}
export default HeaderComponent;