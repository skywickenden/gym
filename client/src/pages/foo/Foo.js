import React from "react";
import {graphql, QueryRenderer} from "react-relay";
import  environment from "../../../relay-environment";

import Layout from "../../layouts/main";
import ListFoo from "./ListFoo";
import AddFoo from "./AddFoo";

const Foo = () => (
  <Layout>
    <h3>Foo page</h3>

    <QueryRenderer
        environment={environment}
        query={graphql`
          query FooQuery {
            Foos {
              ...ListFoo_Foos
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            console.error(error);
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              <AddFoo Foos={props.Foos} />
              <ListFoo Foos={props.Foos} />
            </div>
          );
        }}
      />
      
  </Layout>
);

export default Foo;