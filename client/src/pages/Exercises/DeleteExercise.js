import React from "react";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  delete: css`
    ${baseStyles.button}
    float: right;
    &:hover {
      ${baseStyles.buttonHover}
    }
  `
};

const DeleteExercise = props => {

  const deleteClicked = () => {
    const mutation = graphql`
      mutation DeleteExerciseMutation($id: ID!) {
        deleteExercise(id: $id) {
          id
        }
      }
    `;

    const variables = {
      id: props.exerciseId
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercise does not have pagination.
        const root = store.getRoot();
        const allExercise = root.getLinkedRecords("Exercises");
        const newAllExercise = allExercise.filter( record => 
          record.getDataID() !== props.exerciseId
        );
        root.setLinkedRecords(newAllExercise, "Exercises");
      },
      onCompleted: () => {
        console.log("Delete complete.");
      },
      onError: err => console.error(err)
    });

  };

  return (
    <button className={styles.delete}  onClick={deleteClicked}>
      Delete
    </button>
  );
};

export default DeleteExercise;