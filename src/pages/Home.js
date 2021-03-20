import React from "react";
import NavigationBar from "../components/Navigation-Bar";
import { BrowserRouter as Router } from "react-router-dom";
import {Button} from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Router>
       
        <h1>Some Text and pictures to</h1>
        <Button className='m2' variant='outline-primary'>Login</Button>
        <Button className='m2' variant='outline-primary'>Register</Button>
      </Router>
    </div>
  );
}
