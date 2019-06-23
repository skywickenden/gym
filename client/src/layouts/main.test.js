import React from "react";
import { render } from "../../test-utils";
import Main from "./main";

import { collect } from "linaria/server";
import fs from "fs";
import path from "path";
const css = fs.readFileSync(path.resolve("./.linaria-cache/src/layouts/main.linaria.css"), "utf8");

it("Renders and has text content", () => {
  const { getByText, asFragment, getByTestId  } = render(<Main />);

  // Only need to test elements with styles attached
  // All HTML is tested by the snapshot
  const title = getByText("Gym");
  expect(title.nodeName).toEqual("H1");
  const subTitle = getByText("Graphing your workout");
  expect(subTitle.nodeName).toEqual("H3");

  const baseElement = getByTestId("base");
  const { critical: baseCSS } = collect(baseElement, css);
  expect(baseCSS).toEqual(expect.stringContaining("font-family:Arial,Helvetica,sans-serif;"));
  
  const { critical: titleCSS } = collect(title, css);
  expect(titleCSS).toEqual(expect.stringContaining("color:#872258;"));
  expect(titleCSS).toEqual(expect.stringContaining("font-size:30px;"));

  const homeLink = getByText("Home");
  const { critical: homeLinkCSS } = collect(homeLink, css);
  expect(homeLinkCSS).toEqual(expect.stringContaining("margin:2px 5px;"));

  const fooLink = getByText("Foo");
  const { critical: fooLinkCSS } = collect(fooLink, css);
  expect(fooLinkCSS).toEqual(expect.stringContaining("margin:2px 5px;"));

  const { critical: navCSS } = collect(homeLink.parent, css);
  expect(navCSS).toEqual(expect.stringContaining("background-color:#eeeeff;"));
  expect(navCSS).toEqual(expect.stringContaining("padding:5px;"));

  // This is here as an alternative example for how to test
  // However snapshots do not test the css and tend to be quite brittle.
  expect(asFragment()).toMatchSnapshot();
});