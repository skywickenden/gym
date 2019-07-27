import React, { useEffect, useState  } from "react";
import PropTypes from "prop-types";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  row: css`
    margin-bottom: 10px;
  `,
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
  `,
  select: css`
    display: block;
    height: 24px;
  `,
  error: css`
    ${baseStyles.error}
  `
};

const ExerciseForm = (props) => {

  const defaultType = "weight+reps";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(defaultType);
  const [nameError, setNameError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (props.exercise) {
      setName(props.exercise.name);
      setDescription(props.exercise.description);
      setType(props.exercise.type);
      clearErrors();
    } else {
      setName("");
      setDescription("");
      setType(defaultType);
    }
  }, [props.exercise]);

  const cancelClicked = () => {
    setName("");
    setDescription("");
    setType(defaultType);
    props.toggleFormVisibility(false);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    props.toggleFormVisibility(false);
  };

  const clearErrors = () => {
    setNameError("");
    setFormError("");
  };

  const handleFormErrors = errors => {
    const nameError = errors.find(({message}) => message.includes("Path `name`"));
    if (nameError) {
      if (nameError.message.includes("is required")) {
        setNameError("Name is a required field");
      } else {
        setNameError("There is a problem with the name");
        console.error(errors);
      }
    } else {
      setFormError("There is a problem with the form");
      console.error(errors);
    }
  };

  const addClicked = () => {
  
    const mutation = graphql`
      mutation ExerciseFormAddMutation(
        $name: String!, 
        $description: String, 
        $type: String
      ){
        addExercise(name: $name, description: $description, type: $type) {
          id
          name
          description
          type
        }
      }
    `;

    const variables = {
      name: name,
      description: description,
      type: type
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercises does not have pagination.
        const newSubmission = store.getRootField("addExercise"); 
        const root = store.getRoot();
        const allSubmissions = root.getLinkedRecords("Exercises");
        const newAllSubmissions = [...allSubmissions, newSubmission];
        root.setLinkedRecords(newAllSubmissions, "Exercises");
      },
      onCompleted: (response, errors) => {
        clearErrors();
        if (errors) {
          handleFormErrors(errors);
        } else {
          clearForm();
        }
      },
      onError: error => {throw new Error(error);}
    });

  };

  const editClicked = () => {
  
    const mutation = graphql`
    mutation ExerciseFormEditMutation(
      $id: ID!,
      $name: String!, 
      $description: String, 
      $type: String
    ){
      editExercise(id: $id, name: $name, description: $description, type: $type) {
        id
        name
        description
        type
      }
    }
    `;

    const variables = {
      id: props.exercise.id,
      name: name,
      description: description,
      type: type
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercises does not have pagination.
        const newSubmission = store.getRootField("editExercise");
        if (newSubmission) {
          const root = store.getRoot();
          const allSubmissions = root.getLinkedRecords("Exercises");
          const newAllSubmissions = allSubmissions.map(row => 
            row._dataID === newSubmission._dataID ? newSubmission : row
          );
          root.setLinkedRecords(newAllSubmissions, "Exercises");
        }
      },
      onCompleted: (response, errors) => {
        clearErrors();
        if (errors) {
          handleFormErrors(errors);
        } else {
          clearForm();
        }
      },
      onError: error => {throw new Error(error);}
    });

  };

  return (
    <div>
      <h4>
        {props.exercise ? "Edit " : "Add "}
        Exercise
      </h4>

      <div className={styles.row}>
        <label>
          Enter an exercise name*
          <input 
            className={styles.input} 
            value={name}
            onChange={event => setName(event.target.value)} 
            type="text" />
          <div className={styles.error}>{nameError}</div>
        </label>
      </div>
      
      <div className={styles.row}>
        <label>Type of exercise</label>
        <select 
          value={type}
          onChange={event => setType(event.target.value)}
          className={styles.select} 
          data-testid="excerise-type-select">
          <option 
            value="weight+reps" 
            data-testid="excerise-type-weight">
            Weight &amp; Reps
          </option>
          <option 
            value="distance+time" 
            data-testid="excerise-type-distance">
            Distance &amp; Time
          </option>
        </select> 
      </div>

      <div className={styles.row}>
        <label>
          Describe the exercise
          <input 
            className={styles.input} 
            value={description}
            onChange={event => setDescription(event.target.value)} 
            type="text" />
        </label>
      </div>

      <div className={styles.error}>
        <span className={styles.error}>{formError}</span>
      </div>

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
