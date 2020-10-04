import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavbarComponent from './components/Navbar.js';
import Me from './components/Me.js';
import Report from './components/Report.js';
import CreateReport from './components/CreateReport.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import './App.css';

function App() {
    const [jwt, setJwt] = useState(
        sessionStorage.getItem('token') || null);
    const jwtAuth = (token) => {
        sessionStorage.setItem('token', token);
        setJwt(token);
    };
    const logout = () => {
        sessionStorage.removeItem('token');
        setJwt(null);
    };

    return (
  <Router>
    <div className="App">
      <NavbarComponent jwt={jwt} logout={logout}></NavbarComponent>
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
