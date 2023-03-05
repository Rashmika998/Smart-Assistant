import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function signIn(e) {
    e.preventDefault();

    const newAdmin = {
      email,
      password,
    };

    console.log(newAdmin);
    axios
      .post("http://127.0.0.1:5000/add_admin", newAdmin)
      .then((res) => {
        console.log(newAdmin);
        console.log(res.data.status);
      })
      .catch((err) => {
        setError(err);
        console.log(err.status);
      });
  }
  return (
    <div className="container">
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Admin Signin</h1>
        <Form onSubmit={signIn}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter the email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter the password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <div className="d-grid">
            <Button
              type="submit"
              size="lg"
              style={{ backgroundColor: "#008B8B" }}
            >
              Signin
            </Button>
          </div>
        </Form>
        <br></br>
      </div>
    </div>
  );
}
