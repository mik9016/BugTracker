import React from "react";
import LoginPage from "./LoginPage";
import { Form, Button, } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../Home/Home.module.scss";
import Bug from "../../assets/bug.png";
import { shallow, mount } from "enzyme";
import { AuthContextProvider } from "../../contexts/AuthContext";

describe("rendering components", () => {
  it("renders wihout crashing", () => {
    shallow(
      <AuthContextProvider>
        <LoginPage />
      </AuthContextProvider>
    );
  });
  
});
