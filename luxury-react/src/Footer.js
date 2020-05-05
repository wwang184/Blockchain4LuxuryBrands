import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { AiOutlineCopyrightCircle} from "react-icons/ai";

function FooterComponent(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link href="https://github.com/wwang184/Blockchain4LuxuryBrands">Guides</Nav.Link>
                <Nav.Link href="https://github.com/wwang184/Blockchain4LuxuryBrands">Term of Sale</Nav.Link>
                <Nav.Link href="https://github.com/wwang184/Blockchain4LuxuryBrands">Term of Use</Nav.Link>
                <Nav.Link href="#"><AiOutlineCopyrightCircle style={{verticalAlign: "text-top"}}/>&ensp;2020 DHWZ Group 8</Nav.Link>

            </Nav>
            </Navbar.Collapse>


        </Navbar>
        </div>
    );
}
export default FooterComponent;