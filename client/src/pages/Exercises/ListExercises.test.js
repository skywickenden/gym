import React from "react";
import { render, wait, queryMock  } from "../../../test-utils";
import { toContainElement } from "jest-dom/extend-expect"; // eslint-disable-line no-unused-vars

import Exercises from "./Exercises";
import ExerciseMock from "./__mocks__/ExerciseMock";
import { collect } from "linaria/server";
import fs from "fs";
import path from "path";

const listExercisesCSS = fs.readFileSync(
  path.resolve("./.linaria-cache/src/pages/Exercises/ListExercises.linaria.css"), 
  "utf8"
);

describe("Exercise page", () => {
  it("Lists Exercises", async () => {

    queryMock.mockQuery(ExerciseMock); 
    
    const { 
      getByText, 
      getByTestId
    } = render(<Exercises />);
    const pageTitle = getByTestId("exercises-title");
    // Only node names that are relevant for SEO are tested
    expect(pageTitle.nodeName).toEqual("H3");
    getByText("Loading...");

    await wait(() => {
      const listItem1 = getByText("exercise1");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("exercise2");
      expect(listItem2.nodeName).toEqual("LI");
      const { critical: listItemCSS } = collect(listItem1, listExercisesCSS);
      expect(listItemCSS).toEqual(expect.stringContaining("height:25px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("padding:5px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("line-height:25px;"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(odd){background-color:#ddeeff;}"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(even){background-color:#d5e5ff;}"));
     
      const list = listItem1.parent;
      const { critical: listCSS } = collect(list, listExercisesCSS);
      expect(listCSS).toEqual(expect.stringContaining("width:400px"));
      expect(listCSS).toEqual(expect.stringContaining("list-style-type:none;"));
      expect(listCSS).toEqual(expect.stringContaining("padding:0;"));
    });
    
  });
});
