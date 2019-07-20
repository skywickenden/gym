import React, { useRef } from "react";
import PropTypes from "prop-types";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  add: css`
    ${baseStyles.button}
    &:hover {
      ${baseStyles.buttonHover}
    }
  `,
  input: css`
    margin: 0 10px 0 0;
    display: block;
    margin-bottom: 10px;
  `
};

const AddExerciseForm = (props) => {

  const newExerciseRef = useRef(null);
  const newExerciseDescriptionRef = useRef(null);

  const addClicked = () => {
  
    const mutation = graphql`
      mutation AddExerciseFormMutation($name: String, !$description: String!){
        addExercise(name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const variables = {
      name: newExerciseRef.current.value,
      description: newExerciseDescriptionRef.current.value
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
      onCompleted: () => {
        newExerciseRef.current.value = "";
        newExerciseDescriptionRef.current.value = "";
        props.toggleAddFormVisibility(false);
      },
      onError: err => console.error(err)
    });

  };

  return (
    <div>
      <h4>Add Exercise</h4>
      <label>
        Enter an exercise name:*
        <input className={styles.input} ref={newExerciseRef} type="text" />
      </label>
      <label>
        Describe the exercise:
        <input className={styles.input} ref={newExerciseDescriptionRef} type="text" />
      </label>
      <button className={styles.add} onClick={addClicked.bind(this)}>
        Add
      </button>
    </div>
  );
};

AddExerciseForm.propTypes = {
  toggleAddFormVisibility: PropTypes.func.isRequired,
};

export default AddExerciseForm;
