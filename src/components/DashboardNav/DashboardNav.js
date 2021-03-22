import React from "react";
import classes from "../DashboardNav/DashboardNav.module.scss";
import {Nav} from 'react-bootstrap'

export default function DashboardNav() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home">Done Tickets</Nav.Link>
      <Nav.Link eventKey="link-1">Open Tickets</Nav.Link>
      <Nav.Link eventKey="link-2">All Tickets</Nav.Link>
    </Nav>
  );
}
