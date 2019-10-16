import React, { useState } from "react";
import PropTypes from "prop-types";
import { commitMutation, graphql } from "react-relay";
// import { commitMutation, graphql } from "react-relay";
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
  input: css`
    margin: 0 10px 0 0;
  `,
  error: css`
    ${baseStyles.error}
  `
};

const EditDateTime = props => {
  
  const [datetime, setDatetime] = useState(props.Workout.datetime);
  const [datetimeError, setDatetimeError] = useState("");

  const editClicked = () => {
  
    const mutation = graphql`
    mutation EditDateTimeMutation(
      $id: ID!,
      $datetime: DateTime!,
    ){
      editWorkout(id: $id, datetime: $datetime) {
        id
        datetime
      }
    }
    `;

    const variables = {
      id: props.Workout.id,
      datetime: datetime
    };

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        setDatetimeError("");
      },
      onError: error => setDatetimeError("An invalid Date was entered")
    });

  };

  return (
    <div className={styles.row}>
      <label>
        Enter Workout Date and Time*
        <div>
          <input 
          className={styles.input} 
          value={datetime}
          onChange={event => setDatetime(event.target.value)} 
          type="text" />
          <button className={styles.submit} onClick={editClicked.bind(this)}>
            Edit
          </button>
        </div>
        <div className={styles.error}>{datetimeError}</div>
      </label>
    </div>
  );
};

EditDateTime.propTypes = {
  Workout: PropTypes.object.isRequired,
};

export default EditDateTime;