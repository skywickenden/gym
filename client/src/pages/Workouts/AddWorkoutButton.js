import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  openForm: css`
    ${baseStyles.button}
    &:hover {
      ${baseStyles.buttonHover}
    }
  `
};

const AddWorkoutButton = (props) => {

  return (
    <button 
      className={styles.openForm}
      onClick={() => props.showForm()}>
      Add Workout
    </button>
  );
};

AddWorkoutButton.propTypes = {
  showForm: PropTypes.func.isRequired,
};

export default AddWorkoutButton;
