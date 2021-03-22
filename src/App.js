import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NavigationBar from "./components/Navigation-Bar";
import LoginPage from "./pages/Login/LoginPage";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [isAuthorized, Login, LogOut, Register] = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
