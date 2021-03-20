import "./App.scss";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
