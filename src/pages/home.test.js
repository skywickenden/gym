import React from "react";
import { render } from "../../test-utils";
import { toHaveTextContent } from "jest-dom/extend-expect";
import Home from "./home";

it("Renders and has text content", () => {
  const { getByText } = render(<Home />);
  const content = getByText("Home page");
});
