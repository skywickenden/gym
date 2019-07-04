import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay-environment";

import Layout from "../../layouts/main";

const Exercises = () => (
  <Layout>
    <h3>Exercises</h3>

    <QueryRenderer
      environment={environment}
      query={graphql`
        query ExerciseQuery {
          Exercises {
            ...ListExercises_Exercises
          }
        }
      `}
    />

  </Layout>
);

export default Exercises;