import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export const Login = props => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      event.preventDefault();

      let data = {
          email: email,
          password: password
      }

      fetch("http://localhost:1337/login", {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            props.jwtAuth(res.data.token);
            history.push("/");
        })
        .catch(error => console.error('Error:', error));
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
        <p>Dont have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
};

export default Login;
