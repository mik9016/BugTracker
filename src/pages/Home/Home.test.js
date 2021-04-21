import React from "react";
import Home from "./Home";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../Home/Home.module.scss";
import Bug from "../../assets/bug.png";
import { shallow } from "enzyme";

describe("rendering components", () => {
  it("renders Home component without crashing", () => {
    shallow(<Home />);
  });
  it("renders Home component image without crashing", () => {
    const wrapper = shallow(<Home />);
    const image = <Image className={classes.Icon} src={Bug} />;
    expect(wrapper.contains(image)).toEqual(true);
  });
  it("renders Home component Title without crashing", () => {
    const wrapper = shallow(<Home />);
    const title = <h1>Welcome to Buggy</h1>;
    expect(wrapper.contains(title)).toEqual(true);
  });
  it("renders Home component first paragraph without crashing", () => {
    const wrapper = shallow(<Home />);
    const paragraph = <p>Manage your project and cooperate with team!</p>;
    expect(wrapper.contains(paragraph)).toEqual(true);
  });
  it("renders Home component second paragraph without crashing", () => {
    const wrapper = shallow(<Home />);
    const paragraph = <p>Register and Login to try this out!</p>;
    expect(wrapper.contains(paragraph)).toEqual(true);
  });

  it("renders Home component Login Button without crashing", () => {
    const wrapper = shallow(<Home />);
    const loginBtn = (
      <Button as={Link} to="/login" className="m-2" variant="outline-primary">
        Login
      </Button>
    );
    expect(wrapper.contains(loginBtn)).toEqual(true);
  });
  it("renders Home component Register Button without crashing", () => {
    const wrapper = shallow(<Home />);
    const registerBtn = (
      <Button as={Link} to="/register" className="m-2" variant="primary">
        Register
      </Button>
    );
    expect(wrapper.contains(registerBtn)).toEqual(true);
  });
});
