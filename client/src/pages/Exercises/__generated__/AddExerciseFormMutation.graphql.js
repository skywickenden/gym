/**
 * @flow
 * @relayHash e28d4adac736f27dcdfeeb507112dcac
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddExerciseFormMutationVariables = {|
  name: string,
  description: string,
|};
export type AddExerciseFormMutationResponse = {|
  +addExercise: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
  |}
|};
export type AddExerciseFormMutation = {|
  variables: AddExerciseFormMutationVariables,
  response: AddExerciseFormMutationResponse,
|};
*/


/*
mutation AddExerciseFormMutation(
  $name: String!
  $description: String!
) {
  addExercise(name: $name, description: $description) {
    id
    name
    description
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
  },
  {
    "kind": "LocalArgument",
    "name": "description",
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
        "name": "description",
        "variableName": "description"
      },
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
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
    "name": "AddExerciseFormMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddExerciseFormMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddExerciseFormMutation",
    "id": null,
    "text": "mutation AddExerciseFormMutation(\n  $name: String!\n  $description: String!\n) {\n  addExercise(name: $name, description: $description) {\n    id\n    name\n    description\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fc156a0c84790da0ef126c0cd08a16ff';
module.exports = node;
