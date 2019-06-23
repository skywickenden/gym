/**
 * @flow
 * @relayHash 67c563eede868e690058128fc329633c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteFooMutationVariables = {|
  id: string
|};
export type DeleteFooMutationResponse = {|
  +deleteFoo: ?{|
    +id: ?string
  |}
|};
export type DeleteFooMutation = {|
  variables: DeleteFooMutationVariables,
  response: DeleteFooMutationResponse,
|};
*/


/*
mutation DeleteFooMutation(
  $id: ID!
) {
  deleteFoo(id: $id) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteFoo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DeleteFooMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteFooMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteFooMutation",
    "id": null,
    "text": "mutation DeleteFooMutation(\n  $id: ID!\n) {\n  deleteFoo(id: $id) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c053d3b06c990ab2ef0c518c692867b4';
module.exports = node;
