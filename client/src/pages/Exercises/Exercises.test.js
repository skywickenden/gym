import React from "react";
import { render, wait, queryMock  } from "../../../test-utils";

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";

describe("Exercise page", () => {
  it("Does page render and QueryRenderer work", async () => {

    queryMock.mockQuery(ExerciseMock);  
    
    const { 
      getByText, 
      queryByText, 
      getByTestId
    } = render(<Exercises />);
    const pageTitle = getByTestId("exercises-title");
    // Only node names that are relevant for SEO are tested
    expect(pageTitle.nodeName).toEqual("H3");
    getByText("Loading...");

    await wait(() => {
      // Page loading
      expect(queryByText("Loading...")).toBeNull();
      expect(queryByText("Error!")).toBeNull();
    });

  });
});
