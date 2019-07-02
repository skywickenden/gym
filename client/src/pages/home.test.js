import React from "react";
import { render } from "../../test-utils";
import Home from "./home";

it("Renders and has text content", () => {
  const { getByText } = render(<Home />);
  getByText("Home page");
});
