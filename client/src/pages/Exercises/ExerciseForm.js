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
  `
};

const ExerciseForm = (props) => {

  const defaultType = "weight+reps";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(defaultType);

  // const newExerciseRef = useRef(props.exercise ? props.exercise.name : null);
  // const newExerciseDescriptionRef = useRef(null);

  useEffect(() => {
    if (props.exercise) {
      setName(props.exercise.name);
      setDescription(props.exercise.description);
      setType(props.exercise.type);
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
