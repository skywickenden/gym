import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Exercises from "./pages/Exercises/Exercises";
import Home from "./pages/Home";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/Exercises" component={Exercises} />
    </div>
  </Router>
);

export default Routes;