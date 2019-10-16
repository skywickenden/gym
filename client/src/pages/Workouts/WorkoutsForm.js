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
  error: css`
    ${baseStyles.error}
  `
};

const WorkoutsForm = (props) => {

  const defaultType = "weight+reps";
  const [datetime, setDatetime] = useState("");
  const [datetimeError, setDatetimeError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (props.workout) {
      setDatetime(props.workout.datetime);
      clearErrors();
    } else {
      setDatetime("");
    }
  }, [props.workout]);

  const cancelClicked = () => {
    setDatetime("");
    props.toggleFormVisibility(false);
  };

  const clearForm = () => {
    setDatetime("");
    props.toggleFormVisibility(false);
  };

  const clearErrors = () => {
    setDatetimeError("");
    setFormError("");
  };

  const handleFormErrors = errors => {
    console.log(errors);
    setDatetimeError("A valid Date and Time needs to be entered.");
  };

  const addClicked = () => {
  
    const mutation = graphql`
      mutation WorkoutsFormAddMutation(
        $datetime: DateTime!,
      ){
        addWorkout(datetime: $datetime) {
          id
          datetime
        }
      }
    `;

    const variables = {
      datetime: datetime
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListWorkouts does not have pagination.
        const newSubmission = store.getRootField("addWorkout"); 
        const root = store.getRoot();
        const allSubmissions = root.getLinkedRecords("Workouts");
        const newAllSubmissions = [...allSubmissions];
        const newDatetime = newSubmission.getValue("datetime");
        let insertAfterIndex = newAllSubmissions.findIndex(
          row => Date.parse(row.getValue("datetime")) < Date.parse(newDatetime)
        );
        if (insertAfterIndex === -1) insertAfterIndex = newAllSubmissions.length;
        newAllSubmissions.splice(insertAfterIndex, 0, newSubmission);
        root.setLinkedRecords(newAllSubmissions, "Workouts");
      },
      onCompleted: (response, errors) => {
        clearErrors();
        if (errors) {
          handleFormErrors(errors);
        } else {
          clearForm();
        }
      },
      onError: error => {handleFormErrors(error);}
    });

  };

  return (
    <div>
      <h4>
        {props.workout ? "Edit " : "Add "}
        Workout
      </h4>

      <div className={styles.row}>
        <label>
          Enter Workout Date and Time*
          <input 
            className={styles.input} 
            value={datetime}
            onChange={event => setDatetime(event.target.value)} 
            type="text" />
          <div className={styles.error}>{datetimeError}</div>
        </label>
      </div>

      <div className={styles.error}>
        <span className={styles.error}>{formError}</span>
      </div>

      <button className={styles.submit} onClick={addClicked.bind(this)}>
        Add
      </button>

      <button className={styles.cancel} onClick={cancelClicked.bind(this)}>
        Cancel
      </button>
    </div>
  );
};

WorkoutsForm.propTypes = {
  workout: PropTypes.object,
  toggleFormVisibility: PropTypes.func.isRequired,
};

export default WorkoutsForm;
