import React from "react";
import { render, wait, queryMock  } from "../../../test-utils";

import Workouts from "./Workouts";
import WorkoutsMock from "./__mocks__/WorkoutsMock";

describe("Workout page", () => {
  it("Does page render", async () => {
    
    queryMock.mockQuery(WorkoutsMock); 

    const { 
      getByTestId,
      getByText,
      queryByText
    } = render(<Workouts />);
    const pageTitle = getByTestId("workouts-title");
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
