import React, { useEffect, useState  } from "react";
import PropTypes from "prop-types";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  submit: css`
    ${baseStyles.button}
    &:hover {
      ${baseStyles.buttonHover}
    }
  `,
  cancel: css`
    ${baseStyles.button}
    margin-left: 10px;
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

const ExerciseForm = (props) => {

  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // const newExerciseRef = useRef(props.exercise ? props.exercise.name : null);
  // const newExerciseDescriptionRef = useRef(null);

  useEffect(() => {
    if (props.exercise) {
      setName(props.exercise.name);
      setDescription(props.exercise.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [props.exercise]);

  const cancelClicked = () => {
    setName("");
    setDescription("");
    props.toggleFormVisibility(false);
  };

  const addClicked = () => {
  
    const mutation = graphql`
      mutation ExerciseFormAddMutation($name: String!, $description: String){
        addExercise(name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const variables = {
      name: name,
      description: description
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
        setName("");
        setDescription("");
        props.toggleFormVisibility(false);
      },
      onError: err => console.error(err)
    });

  };

  const editClicked = () => {
  
    const mutation = graphql`
      mutation ExerciseFormEditMutation($id: ID!, $name: String!, $description: String){
        editExercise(id: $id, name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const variables = {
      id: props.exercise.id,
      name: name,
      description:description
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercise does not have pagination.
        const newSubmission = store.getRootField("editExercise"); 
        const root = store.getRoot();
        const allSubmissions = root.getLinkedRecords("Exercises");
        const newAllSubmissions = allSubmissions.map(row => 
          row._dataID === newSubmission._dataID ? newSubmission : row
        );
        root.setLinkedRecords(newAllSubmissions, "Exercises");
      },
      onCompleted: () => {
        setName("");
        setDescription("");
        props.toggleFormVisibility(false);
      },
      onError: err => console.error(err)
    });

  };

  return (
    <div>
      <h4>
        {props.exercise ? "Edit " : "Add "}
        Exercise</h4>
      <label>
        Enter an exercise name:*
        <input 
          className={styles.input} 
          value={name}
          onChange={event => setName(event.target.value)} type="text" />
      </label>
      <label>
        Describe the exercise:
        <input 
          className={styles.input} 
          value={description}
          onChange={event => setDescription(event.target.value)} type="text" />
      </label>
      {props.exercise ? (
        <button className={styles.submit} onClick={editClicked.bind(this)}>
          Edit
        </button>
      ) : (
        <button className={styles.submit} onClick={addClicked.bind(this)}>
          Add
        </button>
      )}
      <button className={styles.cancel} onClick={cancelClicked.bind(this)}>
        Cancel
      </button>
    </div>
  );
};

ExerciseForm.propTypes = {
  exercise: PropTypes.object,
  toggleFormVisibility: PropTypes.func.isRequired,
};

export default ExerciseForm;
