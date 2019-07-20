/**
 * @flow
 * @relayHash b30680c60ef4d707dc2ab298331a26c5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExerciseFormAddMutationVariables = {|
  name: string,
  description?: ?string,
|};
export type ExerciseFormAddMutationResponse = {|
  +addExercise: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
  |}
|};
export type ExerciseFormAddMutation = {|
  variables: ExerciseFormAddMutationVariables,
  response: ExerciseFormAddMutationResponse,
|};
*/


/*
mutation ExerciseFormAddMutation(
  $name: String!
  $description: String
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
    "type": "String",
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
    "name": "ExerciseFormAddMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ExerciseFormAddMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ExerciseFormAddMutation",
    "id": null,
    "text": "mutation ExerciseFormAddMutation(\n  $name: String!\n  $description: String\n) {\n  addExercise(name: $name, description: $description) {\n    id\n    name\n    description\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bd39e1cf10dc2763474b3c28d9c9f873';
module.exports = node;
