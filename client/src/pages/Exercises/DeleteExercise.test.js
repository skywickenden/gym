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

const deleteExerciseCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/DeleteExercise.linaria.css"), 
  "utf8"
);

describe("Delete Exercise module", () => {
  it("Checks the delete button exists for each exercise and clicking deletes the exercise", async () => {

    queryMock.mockQuery(ExerciseMock); 
  
    const { 
      getByText, 
      queryByText, 
      getAllByText
    } = render(<Exercises />); 

    await wait(() => {
      // List Exercises
      const listItem1 = getByText("exercise1");
      const listItem2 = getByText("exercise2");
      const deleteButtons = getAllByText("Delete");
      expect(deleteButtons.length).toEqual(2);
      expect(listItem1).toContainElement(deleteButtons[0]);  
      expect(listItem2).toContainElement(deleteButtons[1]);
      const { critical: deleteCSS } = collect(deleteButtons[0], deleteExerciseCSS);
      const deleteButtonOverrides = {
        "float": "right;"
      };
      const deleteButtonTests = buttonMock(deleteButtonOverrides);
      deleteButtonTests.forEach(
        cssRow => expect(deleteCSS).toEqual(expect.stringContaining(cssRow))
      );
      const deleteButtonHoverTests = buttonHoverMock();
      deleteButtonHoverTests.forEach(
        cssRow => expect(deleteCSS).toEqual(expect.stringContaining(cssRow))
      );
    }); 

    // Delete Exercise Event
    queryMock.mockQuery({
      name: "DeleteExerciseMutation",
      variables: {
        id: "5d07e9310960ad00277ce5d1"
      },
      data: {
        deleteExercise: {
          id :null
        }
      }
    });  
    const deleteButtons = getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    await wait(() => {
      expect(getAllByText("Delete").length).toEqual(1);
      expect(queryByText("exercise1")).toBeNull();
      getByText("exercise2");
    });

  });
});
