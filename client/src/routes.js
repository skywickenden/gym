import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Exercises from "./pages/Exercises/Exercises";
import Workouts from "./pages/Workouts/Workouts";
import Workout from "./pages/Workout/Workout";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/exercises" component={Exercises} />
      <Route exact path="/workouts" component={Workouts} />
      <Route path="/workout/:id/" component={Workout} />
    </div>
  </Router>
);

export default Routes;