import React, { useState } from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay-environment";

import AddWorkoutButton from "./AddWorkoutButton";
import ListWorkouts from "./ListWorkouts";
import WorkoutsForm from "./WorkoutsForm";

import Layout from "../../layouts/main";

const Workout = () => {
  
  const [isFormVisible, setFormVisibility] = useState(false);
  const [editWorkout, setWorkout] = useState(null);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };
  const showForm = (workout) => {
    setFormVisibility(true);
    setWorkout(workout);
  };

  return (
    <Layout>
      <h3 data-testid="workouts-title">Workout</h3>

      <QueryRenderer
        environment={environment}
        query={graphql`
          query WorkoutsQuery {
            Workouts {
              ...ListWorkouts_Workouts
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            console.error(error);
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              {isFormVisible ? (
                <WorkoutsForm 
                toggleFormVisibility={toggleFormVisibility}
                exercise={editWorkout} />
              ) : (
                <AddWorkoutButton showForm={showForm} />
              )}
              <ListWorkouts
                showForm={showForm}
                Workouts={props.Workouts} />
            </div>
          );
        }}
      />

    </Layout>
  );
};

export default Workout;