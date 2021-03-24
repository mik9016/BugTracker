import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import LoginPage from "./pages/Login/LoginPage";
import CreateIssue from "./pages/CreateIssue/Createissue";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Createissue from "./pages/CreateIssue/Createissue";
import Profile from "./pages/Profile/Profile";
import CreateProject from "./pages/CreateProject/CreateProject";
import Footer from "./components/Footer/Footer";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";

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
          <Route path="/home">
            <Home />
          </Route>
          <GuardedRoute
            path="/dashboard"
            component={Dashboard}
            auth={isAuthorized}
          />
          <GuardedRoute
            path="/createIssue"
            component={Createissue}
            auth={isAuthorized}
          />
          <GuardedRoute
            path="/profile"
            component={Profile}
            auth={isAuthorized}
          />
          <GuardedRoute
            path="/createProject"
            component={CreateProject}
            auth={isAuthorized}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
