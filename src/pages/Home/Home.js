import React from "react";
import NavigationBar from "../../components/Navigation-Bar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import classes from '../Home/Home.module.scss'

export default function Home() {
  return (
    <div className={classes.Login}>
      <h1 >Welcome Screen</h1>
      <Button as={Link} to="/login" className="m-2"  variant="outline-primary">
        Login
      </Button>
      <Button as={Link} to="/register" className="m-2" variant="outline-primary">
        Register
      </Button>
    </div>
  );
}
