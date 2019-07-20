import React, { useState } from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay-environment";

import Layout from "../../layouts/main";
import ListExercises from "./ListExercises";
import AddExerciseButton from "./AddExerciseButton";
import ExerciseForm from "./ExerciseForm";

const Exercises = () => {
  
  const [isFormVisible, setFormVisibility] = useState(false);
  const [editExercise, setExercise] = useState(null);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };
  const showForm = (exercise) => {
    setFormVisibility(true);
    setExercise(exercise);
  };

  return (
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
              {isFormVisible ? (
                <ExerciseForm 
                  toggleFormVisibility={toggleFormVisibility}
                  exercise={editExercise} />
              ) : (
                <AddExerciseButton showForm={showForm} />
              )}
              <ListExercises 
                showForm={showForm}
                Exercises={props.Exercises} />
            </div>
          );
        }}
      />

    </Layout>
  );
};

export default Exercises;