/**
 * @flow
 * @relayHash 07e5de36c15bef8fe92da153af822de2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListFoo_Foos$ref = any;
export type FooQueryVariables = {||};
export type FooQueryResponse = {|
  +Foos: ?$ReadOnlyArray<?{|
    +$fragmentRefs: ListFoo_Foos$ref
  |}>
|};
export type FooQuery = {|
  variables: FooQueryVariables,
  response: FooQueryResponse,
|};
*/


/*
query FooQuery {
  Foos {
    ...ListFoo_Foos
    id
  }
}

fragment ListFoo_Foos on Foo {
  id
  foobar
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FooQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Foos",
        "storageKey": null,
        "args": null,
        "concreteType": "Foo",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ListFoo_Foos",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FooQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Foos",
        "storageKey": null,
        "args": null,
        "concreteType": "Foo",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "foobar",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FooQuery",
    "id": null,
    "text": "query FooQuery {\n  Foos {\n    ...ListFoo_Foos\n    id\n  }\n}\n\nfragment ListFoo_Foos on Foo {\n  id\n  foobar\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = 'cd6444608b3d219a46de1cd4b51d0eb8';
module.exports = node;
