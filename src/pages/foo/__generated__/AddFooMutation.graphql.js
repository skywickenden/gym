/**
 * @flow
 * @relayHash 35dfd5778c0c9b2836289f690f36c03d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddFooMutationVariables = {|
  foobar: string
|};
export type AddFooMutationResponse = {|
  +addFoo: ?{|
    +id: ?string,
    +foobar: ?string,
  |}
|};
export type AddFooMutation = {|
  variables: AddFooMutationVariables,
  response: AddFooMutationResponse,
|};
*/


/*
mutation AddFooMutation(
  $foobar: String!
) {
  addFoo(foobar: $foobar) {
    id
    foobar
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "foobar",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addFoo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "foobar",
        "variableName": "foobar"
      }
    ],
    "concreteType": "Foo",
    "plural": false,
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AddFooMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddFooMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddFooMutation",
    "id": null,
    "text": "mutation AddFooMutation(\n  $foobar: String!\n) {\n  addFoo(foobar: $foobar) {\n    id\n    foobar\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '16557ab609b08cc75c3adb727c6aa2d1';
module.exports = node;
