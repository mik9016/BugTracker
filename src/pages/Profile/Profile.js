import React, { useContext, useState, useEffect, useRef } from "react";
import classes from "../Profile/Profile.module.scss";
import {
  Container,
  Form,
  Card,
  FormControl,
  FormLabel,
  Image,
  Button,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import Pic from "../../assets/pic.jpg";
import user from "../../assets/user.svg";
import upload from "../../assets/upload.svg";
import { useStorage } from "../../Hooks/useStorage";
import { DbContext } from "../../contexts/DbContext";
import {useHistory} from 'react-router-dom';

export default function Profile() {
  const history = useHistory();
  const dbContextContent = useContext(DbContext);
  
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
 

  
  const UserName = useRef();

  const [User,setUser] = useState('');


 

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  };

  
  const { progress, url } = useStorage(file);
  return (
    <div className={classes.Profile}>
      <Container>
        <img src={user} className={classes.BackIcon} />
        <h2>Profile</h2>
      </Container>
      <Container className={classes.CardContainer}>
        <Card className={classes.Card}>
          <Card.Body>
            <Form className={classes.Form}>
              <Form.Group>
                <Col>
                  <Image
                    src={file ? url : dbContextContent.loggedUserPhoto}
                    roundedCircle
                    className={classes.Pic}
                  />
                </Col>
                <Col>
                  <label>
                    {file && <p>{progress}% uploaded</p>}
                    <Row>
                      <img src={upload} className={classes.UploadIcon} />
                      <h5 className="mt-4">Upload File</h5>
                      <Form.File
                        id="Avatar"
                        label="Avatar"
                        className={classes.Upload}
                        onChange={handleChange}
                      />
                    </Row>
                  </label>
                </Col>
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group>
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  className={classes.Input}
                  disabled ={true}
                  value={dbContextContent.loggedUserName}
                  ref={UserName}
                  
                />
                <FormLabel className='m-2'>Change Name</FormLabel>
                 <FormControl
                  type="text"
                  className={classes.Input}  
                  
                  ref={UserName}
                  onChange={(e)=>{setUser(e.target.value)}}
                />
              
              </Form.Group>

              <Button
                className="mt-4 mb-2"
                variant="outline-success"
                onClick={() => {
                  
                  User !== '' && dbContextContent.updateUserName(dbContextContent.loggedUserId,User);
                
                  file !== null && dbContextContent.updateUsersPhoto(dbContextContent.loggedUserId,url);  
                               
                  history.push('/projects');
                }}
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
