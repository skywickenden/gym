/**
 * @flow
 * @relayHash 9cbc374361a13b347f97f0bcb8068d54
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExerciseFormEditMutationVariables = {|
  id: string,
  name: string,
  description?: ?string,
|};
export type ExerciseFormEditMutationResponse = {|
  +editExercise: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
  |}
|};
export type ExerciseFormEditMutation = {|
  variables: ExerciseFormEditMutationVariables,
  response: ExerciseFormEditMutationResponse,
|};
*/


/*
mutation ExerciseFormEditMutation(
  $id: ID!
  $name: String!
  $description: String
) {
  editExercise(id: $id, name: $name, description: $description) {
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
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
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
    "name": "editExercise",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
    "name": "ExerciseFormEditMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ExerciseFormEditMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ExerciseFormEditMutation",
    "id": null,
    "text": "mutation ExerciseFormEditMutation(\n  $id: ID!\n  $name: String!\n  $description: String\n) {\n  editExercise(id: $id, name: $name, description: $description) {\n    id\n    name\n    description\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '782cb64a9f8677df63050d1e4138faf4';
module.exports = node;
