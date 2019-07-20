import React from "react";
import { render, wait, queryMock, fireEvent } from "../../../test-utils";
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const addExerciseFormCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/AddExerciseForm.linaria.css"), 
  "utf8"
);


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


describe("Add Exercise Form module", () => {
  it("Checks the form exists and adds a new exercise", async () => {

    queryMock.mockQuery(ExerciseMock); 
    
    const { getByText, getByLabelText, queryByLabelText } = render(<Exercises />);

    // Wait for exercise data to load
    await wait(() => { 
      getByText("Add Exercise");
    });

    const AddExerciseButton = getByText("Add Exercise");
    fireEvent.click(AddExerciseButton);
    await wait(() => {
      const AddExerciseTitle = getByText("Add Exercise");
      expect(AddExerciseTitle.nodeName).toEqual("H4");
    });

    const inputName = getByLabelText("Enter an exercise name:*");
    const inputDescription = getByLabelText("Describe the exercise:");
    const addButton = getByText("Add");
    
    const { critical: inputNameCSS } = collect(inputName, addExerciseFormCSS);
    expect(inputNameCSS).toEqual(expect.stringContaining("margin:0 10px 0 0;"));
    expect(inputNameCSS).toEqual(expect.stringContaining("display:block;"));
    expect(inputNameCSS).toEqual(expect.stringContaining("margin-bottom:10px;"));  

    const { critical: inputDescriptionCSS } = collect(inputDescription, addExerciseFormCSS);
    expect(inputDescriptionCSS).toEqual(expect.stringContaining("margin:0 10px 0 0;"));
    expect(inputDescriptionCSS).toEqual(expect.stringContaining("display:block;"));
    expect(inputDescriptionCSS).toEqual(expect.stringContaining("margin-bottom:10px;"));  
    
    const { critical: addCSS } = collect(addButton, addExerciseFormCSS);
    const addTests = buttonMock();
    addTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );
    const addHoverTests = buttonHoverMock();
    addHoverTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );

    queryMock.mockQuery({
      name: "AddExerciseFormMutation",
      variables: {
        name: "New Exercise",
        description: "A new exercise"
      },
      data: {
        addExercise: {
          id :"5d08cc8b14be08002aa7347d",
          name: "New Exercise",
          description: "A new exercise"
        }
      }
    });  
    inputName.value = "New Exercise";
    inputDescription.value = "A new exercise";
    fireEvent.click(addButton);  
    await wait(() => {
      const listItem1 = getByText("exercise1");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("exercise2");
      expect(listItem2.nodeName).toEqual("LI");
      const listItem3 = getByText("New Exercise");
      expect(listItem3.nodeName).toEqual("LI");
      expect(queryByLabelText("Enter an exercise name:*")).toBeNull();
      const AddExerciseButton = getByText("Add Exercise");
      expect(AddExerciseButton.nodeName).toEqual("BUTTON");
    });      

  });
});
