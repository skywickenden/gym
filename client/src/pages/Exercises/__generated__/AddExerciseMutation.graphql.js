/**
 * @flow
 * @relayHash bccef326fcd3dc00c836ce694c2421cc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddExerciseMutationVariables = {|
  name: string
|};
export type AddExerciseMutationResponse = {|
  +addExercise: ?{|
    +id: ?string,
    +name: ?string,
  |}
|};
export type AddExerciseMutation = {|
  variables: AddExerciseMutationVariables,
  response: AddExerciseMutationResponse,
|};
*/


/*
mutation AddExerciseMutation(
  $name: String!
) {
  addExercise(name: $name) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addExercise",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "Exercise",
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
        "name": "name",
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
    "name": "AddExerciseMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddExerciseMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddExerciseMutation",
    "id": null,
    "text": "mutation AddExerciseMutation(\n  $name: String!\n) {\n  addExercise(name: $name) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '92f013385c5b51df5ec649577c0fef99';
module.exports = node;
