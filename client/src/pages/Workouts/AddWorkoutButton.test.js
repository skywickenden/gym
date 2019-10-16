import React from "react";
import { render, wait, queryMock, fireEvent  } from "../../../test-utils";
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Workouts from "./Workouts";
import WorkoutsMock from "./__mocks__/WorkoutsMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const addWorkoutButtonCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Workouts/AddWorkoutButton.linaria.css"), 
  "utf8"
);

describe("Add Workout button module", () => {
  it("Checks the button exists and opens AddWorkoutForm when clicked", async () => {
  
    queryMock.mockQuery(WorkoutsMock); 

    const { getByText } = render(<Workouts />); 

    await wait(() => {

      const AddWorkoutButton = getByText("Add Workout");
      expect(AddWorkoutButton.nodeName).toEqual("BUTTON");
      const { critical: addButtonCSS } = collect(AddWorkoutButton, addWorkoutButtonCSS);
      const addWorkoutButtonTests = buttonMock();
      addWorkoutButtonTests.forEach(
        cssRow => expect(addButtonCSS).toEqual(expect.stringContaining(cssRow))
      );
      const addWorkoutButtonHoverTests = buttonHoverMock();
      addWorkoutButtonHoverTests.forEach(
        cssRow => expect(addButtonCSS).toEqual(expect.stringContaining(cssRow))
      );
    }); 

    // Button Event
    const AddWorkoutButton = getByText("Add Workout");
    fireEvent.click(AddWorkoutButton);
    await wait(() => {
      const AddWorkoutTitle = getByText("Add Workout");
      expect(AddWorkoutTitle.nodeName).toEqual("H4");
    });

  });
});
