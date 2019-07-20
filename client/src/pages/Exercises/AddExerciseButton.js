import React, { useState } from "react";
import { css } from "linaria";
import baseStyles from "../../base-styles";
import AddExerciseForm from "./AddExerciseForm";

const styles = {
  openForm: css`
    ${baseStyles.button}
    &:hover {
      ${baseStyles.buttonHover}
    }
  `
};

const AddExerciseButton = () => {

  const [isAddFormVisible, toggleAddFormVisibility] = useState(false);

  return isAddFormVisible ? (
    <AddExerciseForm toggleAddFormVisibility={toggleAddFormVisibility}/>
  ) : (
    <button 
      className={styles.openForm}
      onClick={() => toggleAddFormVisibility(!isAddFormVisible)}>
      Add Exercise
    </button>
  );
};

export default AddExerciseButton;
