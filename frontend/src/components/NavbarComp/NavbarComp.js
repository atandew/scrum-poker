import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarComp.css";

function NavbarComp(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home" className="ml-2">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;
