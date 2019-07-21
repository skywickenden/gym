/**
 * @flow
 * @relayHash 8fbaef0fd708ffc3fea6d601d4ab0659
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExerciseFormEditMutationVariables = {|
  id: string,
  name: string,
  description?: ?string,
  type?: ?string,
|};
export type ExerciseFormEditMutationResponse = {|
  +editExercise: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +type: ?string,
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
  $type: String
) {
  editExercise(id: $id, name: $name, description: $description, type: $type) {
    id
    name
    description
    type
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
  },
  {
    "kind": "LocalArgument",
    "name": "type",
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
      },
      {
        "kind": "Variable",
        "name": "type",
        "variableName": "type"
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "type",
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
    "text": "mutation ExerciseFormEditMutation(\n  $id: ID!\n  $name: String!\n  $description: String\n  $type: String\n) {\n  editExercise(id: $id, name: $name, description: $description, type: $type) {\n    id\n    name\n    description\n    type\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '486ba54180c2f80fbe2dd9b9a773d756';
module.exports = node;
