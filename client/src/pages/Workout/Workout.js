import React, { useState } from "react";
import EditDateTime from "./EditDateTime";
import ExercisesInWorkout from "./ExercisesInWorkout";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../../relay-environment";

// import { css } from "linaria";
// import baseStyles from "../../base-styles";

// const styles = {
//   row: css`
//     margin-bottom: 10px;
//   `,
//   submit: css`
//     ${baseStyles.button}
//     &:hover {
//       ${baseStyles.buttonHover}
//     }
//   `,
//   cancel: css`
//     ${baseStyles.button}
//     margin-left: 10px;
//     &:hover {
//       ${baseStyles.buttonHover}
//     }
//   `,
//   input: css`
//     margin: 0 10px 0 0;
//     display: block;
//   `,
//   select: css`
//     display: block;
//     height: 24px;
//   `,
//   error: css`
//     ${baseStyles.error}
//   `
// };

import Layout from "../../layouts/main";

const Workout = (props) => {
  
  console.log(props);
  const workoutId = props.match.params.id;
  return (
    <Layout>
      <h3 data-testid="workout-title">Workout</h3>

      <QueryRenderer
        environment={environment}
        query={graphql`
          query WorkoutQuery ($workoutId: ID!) {
            Workout(id: $workoutId) {
              id
              datetime
              exercisesr
            }
          }
        `}
        variables={{workoutId}}
        render={({error, props}) => {
          console.log(props);
          if (error) {
            console.error(error);
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              <EditDateTime Workout={props.Workout}/>

              <ExercisesInWorkout Workout={props.Workout}/>
            </div>
          );
        }}
      />

    </Layout>
  );
};

export default Workout