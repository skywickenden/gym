import React from "react";
import { render, wait, queryMock, fireEvent } from "../../../test-utils";
import Foo from "./Foo";
import { toContainElement } from "jest-dom/extend-expect"; // eslint-disable-line no-unused-vars

import { collect } from "linaria/server";
import fs from "fs";
import path from "path";
const addFooCSS = fs.readFileSync(path.resolve("./.linaria-cache/src/pages/foo/AddFoo.linaria.css"), "utf8");
const listFooCSS = fs.readFileSync(path.resolve("./.linaria-cache/src/pages/foo/ListFoo.linaria.css"), "utf8");
const deleteFooCSS = fs.readFileSync(path.resolve("./.linaria-cache/src/pages/foo/DeleteFoo.linaria.css"), "utf8");

describe("Foo Integration", () => {
  it("Lists Foo, Adds Foo and Deletes Foo", async () => {

    queryMock.mockQuery({
      name: "FooQuery",
      // variables: {
      //   userId: "123"
      // }
      data: {
        Foos: [
          {
            id: "5d07e9310960ad00277ce5d1",
            foobar: "foobaz1"
          },
          {
            id: "5d07e9330960ad00277ce5d2",
            foobar: "foobaz2"
          }
        ]
      }
    });  
    
    const { 
      getByText, 
      queryByText, 
      getAllByText, 
      getByLabelText  
    } = render(<Foo />);
    const pageTitle = getByText("Foo page");
    // Only node names that are relevant for SEO are tested
    expect(pageTitle.nodeName).toEqual("H3");
    getByText("Loading...");
    
    await wait(() => {
      // Page loading
      expect(queryByText("Loading...")).toBeNull();
      expect(queryByText("Error!")).toBeNull();

      // List Foo
      const listTitle = getByText("List Foo");
      expect(listTitle.nodeName).toEqual("H4");
      const listItem1 = getByText("foobaz1");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("foobaz2");
      expect(listItem2.nodeName).toEqual("LI");
      const deleteButtons = getAllByText("Delete");
      expect(deleteButtons.length).toEqual(2);
      const { critical: listItemCSS } = collect(listItem1, listFooCSS);
      expect(listItemCSS).toEqual(expect.stringContaining("height:25px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("padding:5px;"));
      expect(listItemCSS).toEqual(expect.stringContaining("line-height:25px;"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(odd){background-color:#ddeeff;}"));
      expect(listItemCSS).toEqual(expect.stringContaining(":nth-child(even){background-color:#d5e5ff;}"));
     
      const list = listItem1.parent;
      const { critical: listCSS } = collect(list, listFooCSS);
      expect(listCSS).toEqual(expect.stringContaining("width:400px"));
      expect(listCSS).toEqual(expect.stringContaining("list-style-type:none;"));
      expect(listCSS).toEqual(expect.stringContaining("padding:0;"));

      expect(listItem1).toContainElement(deleteButtons[0]);  
      expect(listItem2).toContainElement(deleteButtons[1]);
      const { critical: deleteCSS } = collect(deleteButtons[0], deleteFooCSS);
      expect(deleteCSS).toEqual(expect.stringContaining("outline-style:none;"));
      expect(deleteCSS).toEqual(expect.stringContaining("display:inline-block;"));
      expect(deleteCSS).toEqual(expect.stringContaining("margin-bottom:0;"));
      expect(deleteCSS).toEqual(expect.stringContaining("font-size:12px;"));
      expect(deleteCSS).toEqual(expect.stringContaining("font-weight:normal;"));
      expect(deleteCSS).toEqual(expect.stringContaining("line-height:1.42857143;"));
      expect(deleteCSS).toEqual(expect.stringContaining("text-align:center;"));
      expect(deleteCSS).toEqual(expect.stringContaining("white-space:nowrap;"));
      expect(deleteCSS).toEqual(expect.stringContaining("vertical-align:middle;"));
      expect(deleteCSS).toEqual(expect.stringContaining("background-image:none;"));
      expect(deleteCSS).toEqual(expect.stringContaining("border:1px solid transparent;"));
      expect(deleteCSS).toEqual(expect.stringContaining("border-radius:4px;"));
      expect(deleteCSS).toEqual(expect.stringContaining("padding:3px 12px;"));
      expect(deleteCSS).toEqual(expect.stringContaining("cursor:pointer;"));
      expect(deleteCSS).toEqual(expect.stringContaining("background-color:#428bca;"));
      expect(deleteCSS).toEqual(expect.stringContaining("color:#fff;"));
      expect(deleteCSS).toEqual(expect.stringContaining("float:right;"));
      expect(deleteCSS).toEqual(expect.stringContaining(":hover{background-color:#3276b1;}"));
    });

    // Add Foo
    const addTitle = getByText("Add Foo");
    expect(addTitle.nodeName).toEqual("H4");
    const input = getByLabelText("Enter some foo:");
    const addButton = getByText("Add");

    const { critical: inputCSS } = collect(input, addFooCSS);
    expect(inputCSS).toEqual(expect.stringContaining("margin:0 10px;"));

    const { critical: addCSS } = collect(addButton, addFooCSS);
    expect(addCSS).toEqual(expect.stringContaining("outline-style:none;"));
    expect(addCSS).toEqual(expect.stringContaining("display:inline-block;"));
    expect(addCSS).toEqual(expect.stringContaining("margin-bottom:0;"));
    expect(addCSS).toEqual(expect.stringContaining("font-size:12px;"));
    expect(addCSS).toEqual(expect.stringContaining("font-weight:normal;"));
    expect(addCSS).toEqual(expect.stringContaining("line-height:1.42857143;"));
    expect(addCSS).toEqual(expect.stringContaining("text-align:center;"));
    expect(addCSS).toEqual(expect.stringContaining("white-space:nowrap;"));
    expect(addCSS).toEqual(expect.stringContaining("vertical-align:middle;"));
    expect(addCSS).toEqual(expect.stringContaining("background-image:none;"));
    expect(addCSS).toEqual(expect.stringContaining("border:1px solid transparent;"));
    expect(addCSS).toEqual(expect.stringContaining("border-radius:4px;"));
    expect(addCSS).toEqual(expect.stringContaining("padding:3px 12px;"));
    expect(addCSS).toEqual(expect.stringContaining("cursor:pointer;"));
    expect(addCSS).toEqual(expect.stringContaining("background-color:#428bca;"));
    expect(addCSS).toEqual(expect.stringContaining("color:#fff;"));
    expect(addCSS).toEqual(expect.stringContaining(":hover{background-color:#3276b1;}"));

    queryMock.mockQuery({
      name: "AddFooMutation",
      variables: {
        foobar: "morebaz"
      },
      data: {
        addFoo: {
          id :"5d08cc8b14be08002aa7347d",
          foobar: "morebaz"
        }
      }
    });  
    
    input.value = "morebaz";
    fireEvent.click(addButton);
    await wait(() => {
      expect(getAllByText("Delete").length).toEqual(3);
      getByText("foobaz1");
      getByText("foobaz2");
      getByText("morebaz");
    });    
    
    // Delete Foo Event
    queryMock.mockQuery({
      name: "DeleteFooMutation",
      variables: {
        id: "5d07e9310960ad00277ce5d1"
      },
      data: {
        deleteFoo: {
          id :null
        }
      }
    });  
    const deleteButtons = getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    await wait(() => {
      expect(getAllByText("Delete").length).toEqual(2);

      expect(queryByText("foobaz1")).toBeNull();
      getByText("foobaz2");
      getByText("morebaz");
    });
  });

  
});
