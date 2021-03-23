import React from "react";
import classes from "../Profile/Profile.module.scss";
import {
  Container,
  Form,
  Card,
  FormControl,
  FormLabel,
  Image,
} from "react-bootstrap";


export default function Profile() {
    const hardcodedUser = {
        name:'Mik',
        
    }
  return (
    <div className={classes.Profile}>
      <Container>
        <Card>
          <Card.Title as="h1">Profile</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group>
                <Image src="assets/pic.jpg" roundedCircle />
                <Form.File id="exampleFormControlFile1" label="Avatar" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" />
              </Form.Group>
              <Form.Group>
                <FormLabel>Role</FormLabel>
                <Form.Control as="select">
                  <option>choose your role..</option>
                  <option>Manager</option>
                  <option>Developer</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
