import React, { useRef } from "react";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";

const AddFoo = () => {

  const newFooRef = useRef(null);

  const addClicked = () => {
  
    const mutation = graphql`
      mutation AddFooMutation($foobar: String!){
        addFoo(foobar: $foobar) {
          id
          foobar
        }
      }
    `;

    const variables = {
      foobar: newFooRef.current.value
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListFoo does not have pagination.
        const newSubmission = store.getRootField("addFoo"); 
        const root = store.getRoot();
        const allSubmissions = root.getLinkedRecords("Foos");
        const newAllSubmissions = [...allSubmissions, newSubmission];
        root.setLinkedRecords(newAllSubmissions, "Foos");
      },
      onCompleted: (response) => newFooRef.current.value = "",
      onError: err => console.error(err)
    });

  }

  return (
    <div>
      <h4>Add Foo</h4>
      <label>
        Enter some foo:
        <input ref={newFooRef} type="text" />
      </label>
      <button onClick={addClicked.bind(this)}>
        Add
      </button>
    </div>
  );
};

export default AddFoo;
