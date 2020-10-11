import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import '../App.css';

export const NavbarComponent = props => {
    return (
        <div>
          <nav className="App-header">
          <Navbar bg="transparent" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Kursmoment" id="basic-nav-dropdown">
                {props.jwt ? (
                        <NavDropdown.Item href="/reports">Create report</NavDropdown.Item>
                    ) : (
                        null
                )}
                  <NavDropdown.Item href="/reports/week/1">kmom01</NavDropdown.Item>
                  <NavDropdown.Item href="/reports/week/2">kmom02</NavDropdown.Item>
                  <NavDropdown.Item href="/reports/week/3">kmom03</NavDropdown.Item>
                  <NavDropdown.Item href="/reports/week/4">kmom04</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/chat">Chat</Nav.Link>
                {props.jwt ? (
                            <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </nav>
        </div>
    );
};

export default NavbarComponent;
