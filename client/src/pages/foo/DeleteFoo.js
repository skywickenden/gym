import React from "react";
import { commitMutation, graphql } from "react-relay";
import environment from "../../../relay-environment";

const DeleteFoo = props => {

  const deleteClicked = () => {
    const mutation = graphql`
      mutation DeleteFooMutation($id: ID!) {
        deleteFoo(id: $id) {
          id
        }
      }
    `;

    const variables = {
      id: props.fooId
    };

    commitMutation(environment, {
      mutation,
      variables,
      updater: (store) => {
        // This is a simple updater since ListFoo does not have pagination.
        const root = store.getRoot();
        const allFoo = root.getLinkedRecords("Foos");
        const newAllFoo = allFoo.filter( record => 
          record.getDataID() !== props.fooId
        );
        root.setLinkedRecords(newAllFoo, "Foos");
      },
      onCompleted: () => {
        console.log("Delete complete.");
      },
      onError: err => console.error(err)
    });

  };

  return (
    <button onClick={deleteClicked}>
      Delete
    </button>
  );
};

export default DeleteFoo;