import React from "react";
import { render } from "../../../test-utils";
import Exercises from "./Exercises";

it("Renders and has text content", () => {
  const { getAllByText } = render(<Exercises />);
  // Ignore the first result - it is the nav and tested in main.test.js
  const title = getAllByText("Exercises")[1];
  expect(title.nodeName).toEqual("H3");
});
