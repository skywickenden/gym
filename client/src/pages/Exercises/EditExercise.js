import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import baseStyles from "../../base-styles";

const styles = {
  edit: css`
    ${baseStyles.button}
    float: right;
    margin-right: 10px;
    margin-left: 10px;
    &:hover {
      ${baseStyles.buttonHover}
    }
  `
};

const EditExercise = (props) => (
  <button 
    className={styles.edit} 
    onClick={props.showForm.bind(this, props.exercise)}>
    Edit
  </button>
);

EditExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  showForm: PropTypes.func.isRequired
};

export default EditExercise;