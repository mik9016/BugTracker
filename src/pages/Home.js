import React from "react";
import NavigationBar from "../components/Navigation-Bar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <h1>Some Text and pictures to</h1>
      <Button as={Link} to="/login" className="m2" variant="outline-primary">
        Login
      </Button>
      <Button as={Link} to="/register" className="m2" variant="outline-primary">
        Register
      </Button>
    </div>
  );
}
