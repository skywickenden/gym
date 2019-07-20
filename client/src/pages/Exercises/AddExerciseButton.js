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

const AddExerciseButton = (props) => {

  return (
    <button 
      className={styles.openForm}
      onClick={() => props.showForm()}>
      Add Exercise
    </button>
  );
};

AddExerciseButton.propTypes = {
  showForm: PropTypes.func.isRequired,
};

export default AddExerciseButton;
