import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import DeleteFoo from "./DeleteFoo";

import { css } from "linaria";

const styles = {
  list: css`
    width: 400px;
    list-style-type: none;
    padding: 0;
  `,
  item: css`
    height: 25px;
    padding: 5px;
    line-height: 25px;
    &:nth-child(odd) {
      background-color: #ddeeff;
    }
    &:nth-child(even) {
      background-color: #d5e5ff;
    }
  `
};

const ListFoo = props => (
  <div>
    <h4>List Foo</h4>
    {props.Foos.length === 0 ? (
      <div>No foo has been created yet</div>
    ) : ""}
    <ul className={styles.list}>
      {props.Foos.map(foo => (
        <li className={styles.item} key={foo.id}>
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