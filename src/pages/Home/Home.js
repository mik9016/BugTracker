import React , {useContext}from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import classes from "../Home/Home.module.scss";
import Bug from "../../assets/bug.png";
import {UtilContext} from '../../contexts/UtilitiesContext';

export default function Home() {

  const [clearInput, checkLog, setDateStamp,setTimeStamp] = useContext(UtilContext);

  return (
    <div className={classes.Home}>
      <Col className={classes.Text}>
        <Container>
          <Image className={classes.Icon} src={Bug} />
          <h1>Welcome to Buggy</h1>
          <p>Manage your project and cooperate with team!</p>
          <p>Register and Login to try this out!</p>
          <Button
            as={Link}
            to="/login"
            className="m-2"
            variant="outline-primary"
          >
            Login
          </Button>
          <Button as={Link} to="/register" className="m-2" variant="primary">
            Register
          </Button>
        </Container>
      </Col>
    </div>
  );
}
