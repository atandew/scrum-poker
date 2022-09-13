import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarComp.css";

function NavbarComp(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/" className="ml-2">Scrum-Poker</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;
