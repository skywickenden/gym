import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import { css } from "linaria";

const styles = {
  list: css`
    width: 400px;
    list-style-type: none;
    padding: 0;
  `,
  item: css`
    height: 25px;
    padding: 5px;
    line-height: 25px;
    &:nth-child(odd) {
      background-color: #ddeeff;
    }
    &:nth-child(even) {
      background-color: #d5e5ff;
    }
  `
};

const ListExercises = props => (
  <div>
    {props.Exercises.length === 0 ? (
      <div>No Exercises have been created yet</div>
    ) : ""}
    <ul className={styles.list}>
      {props.Exercises.map(exercise => (
        <li className={styles.item} key={exercise.id}>
          {exercise.name}
        </li>
      ))}
    </ul>
  </div>
);

export default createFragmentContainer(ListExercises, {
  Exercises: graphql`
    fragment ListExercises_Exercises on Exercise @relay(plural: true) {
      id
      name
    }
  `,
});