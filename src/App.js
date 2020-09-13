import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookies from 'js-cookie';

import Me from './components/Me.js';
import Report from './components/Report.js';
import CreateReport from './components/CreateReport.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

import './App.css';

function App() {
    const [jwt, setJwt] = useState(Cookies.get('token') || null);
    const jwtAuth = (token) => {
        setJwt(token);
    };
    const logout = () => {
        Cookies.remove('token');
        setJwt(null);
    };

    return (
  <Router>
    <div className="App">
      <nav className="App-header">
      <Navbar bg="transparent" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Kursmoment" id="basic-nav-dropdown">
            {jwt ? (
                    <NavDropdown.Item href="/reports">Create report</NavDropdown.Item>
                ) : (
                    null
            )}
              <NavDropdown.Item href="/reports/week/1">kmom01</NavDropdown.Item>
              <NavDropdown.Item href="/reports/week/2">kmom02</NavDropdown.Item>
            </NavDropdown>
            {jwt ? (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </nav>
      <Route exact path="/" component={Me} />
      <Route path="/reports/week/:kmom" component={Report} />
      <Route
          exact path="/reports"
          render={props => <CreateReport {...props} jwt={jwt} />}
      />
      <Route
          path="/login"
          render={props => <Login {...props} jwtAuth={jwtAuth} />}
      />
      <Route path="/register" component={Register} />
    </div>
  </Router>
    );
};

export default App;
