import React from 'react'
import { Navbar, NavLink, Container, NavDropdown, Nav, Offcanvas, Form, FormControl, Button } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar expand={false} variant="dark" className="navClass" style={{ backgroundColor: '#008B8B' }}>
            <Container fluid>
                <Navbar.Brand href="#">
                    {/* <img alt="" src={"assets/logo.jpg"} width="30" height="30" className="d-inline-block align-top" />{' '} */}
                    <h3>Smart Assistant - Used Vehicle Price Prediction System</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Smart Assistant - Used Vehicle Price Prediction System</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavLink to='/home' >Home</NavLink>
                            <Nav.Link href="#action2">Admin Login</Nav.Link>
                            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
