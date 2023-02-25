import React from "react";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Divider } from "antd";
import Link from 'next/link';

//import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
  const router = useRouter();
    //  console.log('router.pathname', router.pathname.split("/")[1])
    return (
      <Navbar bg="dark" expand="lg" variant="dark" >
      <Container fluid >
        <Navbar.Brand href="https://softestingca.com" className="me-5" >SofTesting</Navbar.Brand>
        <Divider style={{backgroundColor:"white !important"}} type="vertical"/>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '110px' }}
            navbarScroll
          >
             <Nav.Link href="/" active = {router.pathname === "/"}  >Home</Nav.Link>
             <Nav.Link href="/projects" active = {router.pathname.split("/")[1] === "projects"} >Projects</Nav.Link>
             <Nav.Link href="/blog" active = {router.pathname.split("/")[1] === "blog"} >Blog</Nav.Link>
             <Nav.Link href="/aboutMe" active = {router.pathname.split("/")[1] === "aboutMe"} >About Me</Nav.Link>
          </Nav>
         
          <Form className="d-flex me-5">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default NavBar;