import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export const CreateReport = props => {
  const [kmom, setKmom] = useState("kmom01");
  const [kmomText, setText] = useState("");
  const apiUrl = "me-api.ml-jsramverk.me";

  function validateForm() {
    return kmom.length > 0 && kmomText.length > 0;
  }

  function handleSubmit(event) {
      event.preventDefault();

      let data = {
          kmom: kmom,
          kmomText: kmomText
      }

      fetch(`https://` + apiUrl + `/reports`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': props.jwt
        },
      })
          .then(response => {
              return response.json();
          }).then(data => {
              console.log(data);
              setText("");
          })
          .catch(error => console.error('Error:', error));
  }

  return (
    <div className="Login">
    <h3>Create report</h3>
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="kmom">
          <FormLabel>Select kmom</FormLabel>
          <FormControl
              as="select"
              onChange={e => setKmom(e.target.value)}
              value={kmom}
          >
            <option>kmom01</option>
            <option>kmom02</option>
            <option>kmom02</option>
            <option>kmom03</option>
            <option>kmom04</option>
            <option>kmom05</option>
            <option>kmom06</option>
            <option>kmom10</option>
          </FormControl>
      </FormGroup>
      <FormGroup controlId="kmomText">
          <FormLabel>Kmom text</FormLabel>
          <FormControl
              as="textarea"
              rows="6"
              onChange={e => setText(e.target.value)}
              value={kmomText}
          />
      </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Create report
        </Button>
      </form>
    </div>
  );
};

export default CreateReport;
