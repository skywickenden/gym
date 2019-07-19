import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay-environment";

import Layout from "../../layouts/main";
import ListExercises from "./ListExercises";
import AddExercise from "./AddExercise";

const Exercises = () => (
  <Layout>
    <h3 data-testid="exercises-title">Exercises</h3>

    <QueryRenderer
      environment={environment}
      query={graphql`
        query ExercisesQuery {
          Exercises {
            ...ListExercises_Exercises
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
            <AddExercise Exercises={props.Exercises} />
            <ListExercises Exercises={props.Exercises} />
          </div>
        );
      }}
    />

  </Layout>
);

export default Exercises;