import React, { useState } from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql } from "react-relay";
import DeleteExercise from "./DeleteExercise";
import EditExercise from "./EditExercise";

import { css } from "linaria";

const styles = {
  list: css`
    width: 400px;
    list-style-type: none;
    padding: 0;
  `,
  item: css`
    padding: 5px;
    font-size: 16px;
    line-height: 25px;
    cursor: pointer;
    &:nth-child(odd) {
      background-color: #ddeeff;
    }
    &:nth-child(even) {
      background-color: #d5e5ff;
    }
    &:hover&:nth-child(odd) {
      background-color: #dbecfd;
    }
    &:hover&:nth-child(even) {
      background-color: #d2e2fd;
    }
  `,
  description: css`
    font-size: 14px;
    color: #666;
  `
};

const ListExercises = props => {
  
  const [showDescriptionId, setShowDescriptionId] = useState(null);

  const exerciseClicked = (exercise) => {
    setShowDescriptionId(exercise.id);
  };
  return (
    <div>
      {props.Exercises.length === 0 ? (
        <div>No Exercises have been created yet</div>
      ) : ""}
      <ul className={styles.list}>
        {props.Exercises.map(exercise => (
          <li 
            className={styles.item} 
            key={exercise.id} 
            onClick={exerciseClicked.bind(null, exercise)}>
            <DeleteExercise exercise={exercise} />
            <EditExercise 
              exercise={exercise} 
              showForm={props.showForm} />
            {exercise.name}
            {showDescriptionId === exercise.id ? (
              <div className={styles.description}>
                {exercise.description}
              </div>
            ) : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListExercises.propTypes = {
  Exercises: PropTypes.array.isRequired,
  showForm: PropTypes.func.isRequired
};

export default createFragmentContainer(ListExercises, {
  Exercises: graphql`
    fragment ListExercises_Exercises on Exercise @relay(plural: true) {
      id
      name
      description
    }
  `,
});