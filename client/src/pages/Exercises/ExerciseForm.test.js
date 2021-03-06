import React from "react";
import { render, cleanup, wait, queryMock, fireEvent } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import buttonMock from "../../baseStyleMocks/buttonMock";
import buttonHoverMock from "../../baseStyleMocks/buttonHoverMock";

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const exerciseFormCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/ExerciseForm.linaria.css"), 
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


describe("Add Exercise Form module", () => {
  it("Checks the form exists and adds a new exercise", async () => {

    queryMock.mockQuery(ExerciseMock); 
    
    const { 
      getByText, 
      getByLabelText, 
      queryByLabelText ,
      getByTestId
    } = render(<Exercises />);

    // Wait for exercise data to load
    await wait(() => { 
      getByText("Add Exercise");
    });

    const addExerciseButton = getByText("Add Exercise");
    fireEvent.click(addExerciseButton);
    await wait(() => {
      const addExerciseTitle = getByText("Add Exercise");
      expect(addExerciseTitle.nodeName).toEqual("H4");
    });

    const inputName = getByLabelText("Enter an exercise name*");
    const inputDescription = getByLabelText("Describe the exercise");
    getByText("Type of exercise");
    const select = getByTestId("excerise-type-select");
    const selectOption1 = getByTestId("excerise-type-weight");
    const selectOption2 = getByTestId("excerise-type-distance");
    expect(selectOption1.innerHTML).toBe("Weight &amp; Reps");
    expect(selectOption2.innerHTML).toBe("Distance &amp; Time");
    const addButton = getByText("Add");
    const cancelButton = getByText("Cancel");
    
    const { critical: inputNameCSS } = collect(inputName, exerciseFormCSS);
    expect(inputNameCSS).toEqual(expect.stringContaining("margin:0 10px 0 0;"));
    expect(inputNameCSS).toEqual(expect.stringContaining("display:block;"));

    const { critical: inputDescriptionCSS } = collect(inputDescription, exerciseFormCSS);
    expect(inputDescriptionCSS).toEqual(expect.stringContaining("margin:0 10px 0 0;"));
    expect(inputDescriptionCSS).toEqual(expect.stringContaining("display:block;"));  
    
    const { critical: selectCSS } = collect(select, exerciseFormCSS);
    expect(selectCSS).toEqual(expect.stringContaining("display:block;"));
    expect(selectCSS).toEqual(expect.stringContaining("height:24px;"));

    expect(selectOption1.selected).toBe(true);
    expect(selectOption2.selected).toBe(false);
    userEvent.selectOptions(select, "distance+time");
    await wait(() => {
      expect(selectOption1.selected).toBe(false);
      expect(selectOption2.selected).toBe(true);
    });

    const { critical: addCSS } = collect(addButton, exerciseFormCSS);
    const addTests = buttonMock();
    addTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );
    const addHoverTests = buttonHoverMock();
    addHoverTests.forEach(
      cssRow => expect(addCSS).toEqual(expect.stringContaining(cssRow))
    );

    const { critical: cancelCSS } = collect(cancelButton, exerciseFormCSS);
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
      name: "ExerciseFormAddMutation",
      variables: {
        name: "New Exercise",
        description: "A new exercise",
        type: "distance+time"
      },
      data: {
        addExercise: {
          id :"5d08cc8b14be08002aa7347d",
          name: "New Exercise",
          description: "A new exercise",
          type: "distance+time"
        }
      }
    });  
    fireEvent.change(inputName, { target: { value: "New Exercise" } });
    fireEvent.change(inputDescription, { target: { value: "A new exercise" } });
    fireEvent.change(select, { target: { value: "distance+time" } });
    fireEvent.click(addButton);  
    await wait(() => {
      const listItem1 = getByText("exercise1");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("exercise2");
      expect(listItem2.nodeName).toEqual("LI");
      const listItem3 = getByText("New Exercise");
      expect(listItem3.nodeName).toEqual("LI");
      expect(queryByLabelText("Enter an exercise name*")).toBeNull();
      const AddExerciseButton = getByText("Add Exercise");
      expect(AddExerciseButton.nodeName).toEqual("BUTTON");
    });      

  });

  it("Checks an existing exercise can be edited", async () => {

    queryMock.mockQuery(ExerciseMock); 
    
    const { getByText, getAllByText, getByLabelText, queryByLabelText } = render(<Exercises />);

    // Wait for exercise data to load
    await wait(() => { 
      getByText("exercise1");
    });

    const editButtons = getAllByText("Edit");
    expect(editButtons.length).toEqual(2);
    fireEvent.click(editButtons[0]);
    await wait(() => {
      const editExerciseTitle = getByText("Edit Exercise");
      expect(editExerciseTitle.nodeName).toEqual("H4");
    });

    const inputName = getByLabelText("Enter an exercise name*");
    expect(inputName.value).toEqual("exercise1");
    const inputDescription = getByLabelText("Describe the exercise");
    expect(inputDescription.value).toEqual("exercise1 description");
    const newEditButtons = getAllByText("Edit");
    expect(newEditButtons.length).toEqual(3);

    queryMock.mockQuery({
      name: "ExerciseFormEditMutation",
      variables: {
        id :"5d07e9310960ad00277ce5d1",
        name: "Edited Exercise",
        description: "An edited exercise",
        type: "distance+time"
      },
      data: {
        editExercise: {
          id :"5d07e9310960ad00277ce5d1",
          name: "Edited Exercise",
          description: "An edited exercise",
          type: "distance+time"
        }
      }
    });  
    fireEvent.change(inputName, { target: { value: "Edited Exercise" } });
    fireEvent.change(inputDescription, { target: { value: "An edited exercise" } });
    fireEvent.click(newEditButtons[0]);  
    await wait(() => {
      const listItem1 = getByText("Edited Exercise");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("exercise2");
      expect(listItem2.nodeName).toEqual("LI");
      expect(queryByLabelText("Enter an exercise name:*")).toBeNull();
      const AddExerciseButton = getByText("Add Exercise");
      expect(AddExerciseButton.nodeName).toEqual("BUTTON");
      const editButtons = getAllByText("Edit");
      expect(editButtons.length).toEqual(2);      
    });           
  });      
 
  it("Checks an edited exercise shows an error if the name field is empty", async () => {

    queryMock.mockQuery(ExerciseMock); 
    
    const { getByText, getAllByText, getByLabelText } = render(<Exercises />);

    // Wait for exercise data to load
    await wait(() => { 
      getByText("exercise1");
    });

    const editButtons = getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    await wait(() => {
      const editExerciseTitle = getByText("Edit Exercise");
      expect(editExerciseTitle.nodeName).toEqual("H4");
    });

    const inputName = getByLabelText("Enter an exercise name*");
    const newEditButtons = getAllByText("Edit");

    queryMock.mockQuery({
      name: "ExerciseFormEditMutation",
      variables: {
        id :"5d07e9310960ad00277ce5d1",
        name: "",
        description: "exercise1 description",
        type: "distance+time"
      },
      data: {
        editExercise: null
      },
      graphqlErrors: [
        {
          message: "Validation failed: name: Path `name` is required.",
          locations: [
            {
              line: 7,
              column: 3
            }
          ],
          path: [
            "editExercise"
          ]
        }
      ]
    });  
    await fireEvent.change(inputName, { target: { value: "" } });
    fireEvent.click(newEditButtons[0]);  
    await wait(() => {
      getByText("Name is a required field");
      const listItem1 = getByText("exercise1");
      expect(listItem1.nodeName).toEqual("LI");  
      const editButtons = getAllByText("Edit");
      expect(editButtons.length).toEqual(3);      

      
    });      

  });  
});
