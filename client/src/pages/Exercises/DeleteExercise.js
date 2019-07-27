import React, { useState } from "react";
import PropTypes from "prop-types";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";
import Modal from "react-responsive-modal";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  delete: css`
    ${baseStyles.button}
    float: right;
    &:hover {
      ${baseStyles.buttonHover}
    }
  `,
  modalBody: css`
    margin-top: 20px;
    min-width: 300px;
  `,
  modalFooter: css`
    margin-top: 20px;
  `,
  confirm: css`
  ${baseStyles.buttonSecondary}
  float: left;
  &:hover {
    ${baseStyles.buttonSecondaryHover}
  }
  `,
  cancel: css`
  ${baseStyles.button}
  float: right;
  &:hover {
    ${baseStyles.buttonHover}
  }
  `
};

const DeleteExercise = props => {

  const [modalVisible, setModalVisible] = useState(false);

  const deleteClicked = () => {
    setModalVisible(true);
  };

  const deleteConfirmed = () => {
    const mutation = graphql`
      mutation DeleteExerciseMutation($id: ID!) {
        deleteExercise(id: $id) {
          id
        }
      }
    `;

    const variables = {
      id: props.exercise.id
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListExercise does not have pagination.
        const root = store.getRoot();
        const allExercise = root.getLinkedRecords("Exercises");
        const newAllExercise = allExercise.filter( record => 
          record.getDataID() !== props.exercise.id
        );
        root.setLinkedRecords(newAllExercise, "Exercises");
      },
      onError: err => console.error(err)
    });

  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <span>
      <button className={styles.delete}  onClick={deleteClicked}>
        Delete
      </button>
      <Modal open={modalVisible} onClose={onCloseModal} center>
        <div className={styles.modalBody}>
          Please confirm deletion of exercise:
          <div><strong>{props.exercise.name}</strong>}</div>
        </div>
        <div className={styles.modalFooter}>
          <button 
            className={styles.confirm}
            onClick={deleteConfirmed} >
            Confirm
          </button>          
          <button 
            className={styles.cancel}
            onClick={() => setModalVisible(false)} >
            Cancel
          </button>
        </div>
      </Modal>      
    </span>
  );
};

DeleteExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
};

export default DeleteExercise;