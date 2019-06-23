import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import DeleteFoo from "./DeleteFoo";

const ListFoo = props => (
  <div>
    <h4>List Foo</h4>
    {props.Foos.length === 0 ? (
      <div>No foo has been created yet</div>
    ) : ""}
    <ul>
      {props.Foos.map(foo => (
        <li key={foo.id}>
          {foo.foobar}
          <DeleteFoo fooId={foo.id} />
        </li>
      ))}
    </ul>
  </div>
);

export default createFragmentContainer(ListFoo, {
  Foos: graphql`
    fragment ListFoo_Foos on Foo @relay(plural: true) {
      id
      foobar
    }
  `,
});