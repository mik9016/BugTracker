import React from "react";
import NavigationBar from "../components/Navigation-Bar";
import { BrowserRouter as Router } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Router>
        <NavigationBar />
      </Router>
    </div>
  );
}
