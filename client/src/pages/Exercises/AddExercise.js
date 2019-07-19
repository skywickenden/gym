import React, { useRef } from "react";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  input: css`
    margin: 0 10px;
  `,
  add: css`
    ${baseStyles.button}
    &:hover {
      ${baseStyles.buttonHover}
    }
  `
};

const AddExercise = () => {

  const newExerciseRef = useRef(null);

  const addClicked = () => {
  
    const mutation = graphql`
      mutation AddExerciseMutation($name: String!){
        addExercise(name: $name) {
          id
          name
        }
      }
    `;

    const variables = {
      name: newExerciseRef.current.value
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercise does not have pagination.
        const newSubmission = store.getRootField("addExercise"); 
        const root = store.getRoot();
        const allSubmissions = root.getLinkedRecords("Exercises");
        const newAllSubmissions = [...allSubmissions, newSubmission];
        root.setLinkedRecords(newAllSubmissions, "Exercises");
      },
      onCompleted: () => newExerciseRef.current.value = "",
      onError: err => console.error(err)
    });

  };

  return (
    <div>
      <h4>Add Exercise</h4>
      <label>
        Enter an exercise:
        <input className={styles.input} ref={newExerciseRef} type="text" />
      </label>
      <button className={styles.add} onClick={addClicked.bind(this)}>
        Add
      </button>
    </div>
  );
};

export default AddExercise;
