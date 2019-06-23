import React from "react";
import { render, wait, queryMock, fireEvent, waitForElement } from "../../../test-utils";
import { toContainElement } from "jest-dom/extend-expect";
import Foo from "./Foo";

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

      // Add Foo Form
      const addTitle = getByText("Add Foo");
      expect(addTitle.nodeName).toEqual("H4");

      // List Foo
      const listTitle = getByText("List Foo");
      expect(listTitle.nodeName).toEqual("H4");
      const listItem1 = getByText("foobaz1");
      expect(listItem1.nodeName).toEqual("LI");  
      const listItem2 = getByText("foobaz2");
      expect(listItem2.nodeName).toEqual("LI");
      const deleteButtons = getAllByText("Delete");
      expect(deleteButtons.length).toEqual(2);
      expect(listItem1).toContainElement(deleteButtons[0]);  
      expect(listItem2).toContainElement(deleteButtons[1]);
    });

    // Add Foo Event
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
    
    const input = getByLabelText("Enter some foo:");
    input.value = "morebaz";
    const addButton = getByText("Add");
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
