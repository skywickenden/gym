import React from "react";
import { render, cleanup, wait, queryMock, fireEvent } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Workouts from "./Workouts";
import WorkoutsMock from "./__mocks__/WorkoutsMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const workoutFormCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Workouts/WorkoutForm.linaria.css"), 
  "utf8"
);

afterEach(cleanup);

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
// Fix due with React 16.9.0 
// see https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});


describe("Add Workout Form module", () => {
  it("Checks the form exists and adds a new workout", async () => {

    queryMock.mockQuery(WorkoutsMock); 
    
    const { 
      getByText, 
      getByLabelText, 
      queryByLabelText ,
      getByTestId
    } = render(<Workouts />);

    // Wait for workout data to load
    await wait(() => { 
      getByText("Add Workout");
    });

    const addWorkoutButton = getByText("Add Workout");
    fireEvent.click(addWorkoutButton);
    await wait(() => {
      const addWorkoutTitle = getByText("Add Workout");
      expect(addWorkoutTitle.nodeName).toEqual("H4");
    });

    const inputName = getByLabelText("Enter Workout Date and Time*");
    const addButton = getByText("Add");
    const cancelButton = getByText("Cancel");
    
    const { critical: inputNameCSS } = collect(inputName, workoutFormCSS);
    expect(inputNameCSS).toEqual(expect.stringContaining("margin:0 10px 0 0;"));
    expect(inputNameCSS).toEqual(expect.stringContaining("display:block;"));

    const { critical: addCSS } = collect(addButton, workoutFormCSS);
    const addTests = buttonMock();
    addTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );
    const addHoverTests = buttonHoverMock();
    addHoverTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );

    const { critical: cancelCSS } = collect(cancelButton, workoutFormCSS);
    const cancelOverrides = { "margin-left": "10px;"};
    const cancelTests = buttonMock(cancelOverrides);
    cancelTests.forEach(
      cssRow => expect(cancelCSS).toEqual(expect.stringContaining(cssRow))
    );
    const cancelHoverTests = buttonHoverMock();
    cancelHoverTests.forEach(
      cssRow => expect(cancelCSS).toEqual(expect.stringContaining(cssRow))
    );

    queryMock.mockQuery({
      name: "WorkoutFormAddMutation",
      variables: {
        datetime: "2010-08-02T10:15:00.000Z"
      },
      data: {
        addWorkout: {
          id :"5d08cc8b14be08002aa7347d",
          datetime: "2010-08-02T10:15:00.000Z"
        }
      }
    });  
    fireEvent.change(inputName, { target: { value: "2010-08-02T10:15:00.000Z" } });
    fireEvent.click(addButton);  
    await wait(() => {
      const listItem1 = getByText("8/2/2022");  // toLocaleDateString is weird in tests!
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("8/2/2019");
      expect(listItem2.nodeName).toEqual("LI");
      const listItem3 = getByText("8/2/2010");
      expect(listItem3.nodeName).toEqual("LI");
      expect(queryByLabelText("Enter Workout Date and Time*")).toBeNull();
      const AddWorkoutButton = getByText("Add Workout");
      expect(AddWorkoutButton.nodeName).toEqual("BUTTON");
    });      

  });

});
