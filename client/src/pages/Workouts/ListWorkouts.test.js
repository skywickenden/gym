import React from "react";
import { render, wait, queryMock, fireEvent } from "../../../test-utils";
import { toContainElement } from "jest-dom/extend-expect"; // eslint-disable-line no-unused-vars

import Workouts from "./Workouts";
import WorkoutsMock from "./__mocks__/WorkoutsMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const listWorkoutsCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Workouts/ListWorkouts.linaria.css"), 
  "utf8"
);

describe("Workouts page", () => {
  it("Lists Workouts", async () => {

    queryMock.mockQuery(WorkoutsMock); 
    
    const { 
      getByText, 
      getByTestId
    } = render(<Workouts />);
    const pageTitle = getByTestId("workouts-title");
    // Only node names that are relevant for SEO are tested
    expect(pageTitle.nodeName).toEqual("H3");
    getByText("Loading...");

    await wait(() => {
      const listItem1 = getByText("8/2/2022");  // toLocaleDateString is weird in tests!
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("8/2/2019");
      expect(listItem2.nodeName).toEqual("LI");
      const { critical: listItemCSS } = collect(listItem1, listWorkoutsCSS);
      expect(listItemCSS).toEqual(expect.stringContaining("padding:5px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("line-height:25px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("cursor:pointer;"));
      expect(listItemCSS).toEqual(expect.stringContaining("font-size:16px;"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(odd){background-color:#ddeeff;}"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(even){background-color:#d5e5ff;}"));
      // No easy way to test hover and nth-child together
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(odd){background-color:#dbecfd;}"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(even){background-color:#d2e2fd;}"));
     
      const list = listItem1.parent;
      const { critical: listCSS } = collect(list, listWorkoutsCSS);
      expect(listCSS).toEqual(expect.stringContaining("width:400px"));
      expect(listCSS).toEqual(expect.stringContaining("list-style-type:none;"));
      expect(listCSS).toEqual(expect.stringContaining("padding:0;"));
    });

    // select event
    const listItem1 = getByText("8/2/2022");
    fireEvent.click(listItem1);
    await wait(() => {
      // @todo when workout page is done
      // const description = getByText("workout1 description");
      // getByText("Distance & Time");
      // const { critical: descriptionCSS } = collect(description, listWorkoutsCSS);
      // expect(descriptionCSS).toEqual(expect.stringContaining("font-size:14px;"));
      // expect(descriptionCSS).toEqual(expect.stringContaining("color:#666;"));
    });        
    
  });
});
