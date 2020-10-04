import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "me-api.ml-jsramverk.me";

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      event.preventDefault();

      let data = {
          email: email,
          password: password
      }

      fetch(`https://` + apiUrl + `/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => {
              return response.json();
          }).then(data => {
              console.log(data);
              history.push("/");
          })
          .catch(error => console.error('Error:', error));
  }

  return (
    <div className="Login">
    <h3>Register new user</h3>
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
          Register user
        </Button>
      </form>
    </div>
  );
};
