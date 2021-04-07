import React from "react";
import classes from "../StatCard/StatCard.module.scss";
import { Card, Containter, Row, Col, Button } from "react-bootstrap";

export default function StatCard(props) {
  return (
    <div className={classes.StatCard}>
      <Card >
        <Col>
        <img src={props.icon} className={props.iconClass}/>
        </Col>
        <Col>
          <Card.Title className={props.styleType}>{props.title}</Card.Title>
          <Card.Body>
            <Card.Text className={props.styleType}>{props.text}</Card.Text>
          </Card.Body>
        </Col>
      </Card>
    </div>
  );
}
