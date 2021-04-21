import React from "react";
import LoginPage from './LoginPage';
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../Home/Home.module.scss";
import Bug from "../../assets/bug.png";
import { shallow,mount } from "enzyme";
import {AuthContext,AuthContextProvider} from '../../contexts/AuthContext';

describe('rendering components',()=>{
    it('renders wihout crashing',()=>{
  
        const wrapper = mount(
            <AuthContextProvider>
                <LoginPage/>
            </AuthContextProvider>
        )
        const h1 = <h1 className="text-center m-2">Login</h1>
        expect(wrapper.contains(h1)).toEqual(true);
    })
})