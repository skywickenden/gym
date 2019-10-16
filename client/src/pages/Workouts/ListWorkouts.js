import React, { useState } from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql } from "react-relay";
import { withRouter } from "react-router-dom";

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

const ListWorkouts = withRouter( props => {
  const workoutClicked = (workout) => {
    props.history.push("/workout/" + workout.id);
  };
  return (
    <div>
      {props.Workouts.length === 0 ? (
        <div>No Workouts have been created yet</div>
      ) : ""}
      <ul className={styles.list}>
        {props.Workouts.map(workout => (
          <li 
            className={styles.item} 
            key={workout.id} 
            onClick={workoutClicked.bind(null, workout)}>
            {new Date(workout.datetime).toLocaleDateString(undefined, {dateStyle: "full", timeStyle: "short"})}
          </li>
        ))}
      </ul>
    </div>
  );
});

ListWorkouts.propTypes = {
  Workouts: PropTypes.array.isRequired,
  showForm: PropTypes.func.isRequired
};

export default createFragmentContainer(ListWorkouts, {
  Workouts: graphql`
    fragment ListWorkouts_Workouts on Workout @relay(plural: true) {
      id
      datetime
    }
  `,
});