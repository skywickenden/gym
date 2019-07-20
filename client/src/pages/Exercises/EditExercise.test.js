import React from "react";
import { render, wait, queryMock, fireEvent  } from "../../../test-utils";
import { toContainElement } from "jest-dom/extend-expect"; // eslint-disable-line no-unused-vars
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const editExerciseCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/EditExercise.linaria.css"), 
  "utf8"
);

describe("Edit Exercise module", () => {
  it("Checks that the Edit button exists on each list row and clicking it opens the form", async () => {

    queryMock.mockQuery(ExerciseMock); 
  
    const { 
      getByText, 
      getAllByText
    } = render(<Exercises />); 

    await wait(() => {
      // List Exercises
      const listItem1 = getByText("exercise1");
      const listItem2 = getByText("exercise2");
      const editButtons = getAllByText("Edit");
      expect(editButtons.length).toEqual(2);
      expect(listItem1).toContainElement(editButtons[0]);  
      expect(listItem2).toContainElement(editButtons[1]);
      const { critical: editCSS } = collect(editButtons[0], editExerciseCSS);
      const editButtonOverrides = {
        "float": "right;",
        "margin-right": "10px;",
        "margin-left": "10px;"
      };
      const editButtonTests = buttonMock(editButtonOverrides);
      editButtonTests.forEach(
        cssRow => expect(editCSS).toEqual(expect.stringContaining(cssRow))
      );
      const editButtonHoverTests = buttonHoverMock();
      editButtonHoverTests.forEach(
        cssRow => expect(editCSS).toEqual(expect.stringContaining(cssRow))
      );
    }); 

    // Edit Exercise Event
    const editButtons = getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    await wait(() => {
      const editExerciseTitle = getByText("Edit Exercise");
      expect(editExerciseTitle.nodeName).toEqual("H4");
      // The rest is tested in ExerciseForm.js
    });    

  });
});
