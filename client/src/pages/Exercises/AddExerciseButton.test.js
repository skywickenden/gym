import React from "react";
import { render, wait, queryMock, fireEvent  } from "../../../test-utils";
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const addExerciseButtonCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/AddExerciseButton.linaria.css"), 
  "utf8"
);

describe("Add Exercise button module", () => {
  it("Checks the button exists and opens AddExerciseForm when clicked", async () => {
  
    queryMock.mockQuery(ExerciseMock); 

    const { getByText } = render(<Exercises />); 

    await wait(() => {

      const AddExerciseButton = getByText("Add Exercise");
      expect(AddExerciseButton.nodeName).toEqual("BUTTON");
      const { critical: addButtonCSS } = collect(AddExerciseButton, addExerciseButtonCSS);
      const addExerciseButtonTests = buttonMock();
      addExerciseButtonTests.forEach(
        cssRow => expect(addButtonCSS).toEqual(expect.stringContaining(cssRow))
      );
      const addExerciseButtonHoverTests = buttonHoverMock();
      addExerciseButtonHoverTests.forEach(
        cssRow => expect(addButtonCSS).toEqual(expect.stringContaining(cssRow))
      );
    }); 

    // Button Event
    const AddExerciseButton = getByText("Add Exercise");
    fireEvent.click(AddExerciseButton);
    await wait(() => {
      const AddExerciseTitle = getByText("Add Exercise");
      expect(AddExerciseTitle.nodeName).toEqual("H4");
    });

  });
});
