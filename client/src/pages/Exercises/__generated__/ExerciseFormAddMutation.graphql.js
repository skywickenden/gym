/**
 * @flow
 * @relayHash 757fc5335ee57ef4a1414b4520020282
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExerciseFormAddMutationVariables = {|
  name: string,
  description?: ?string,
  type?: ?string,
|};
export type ExerciseFormAddMutationResponse = {|
  +addExercise: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +type: ?string,
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
  $type: String
) {
  addExercise(name: $name, description: $description, type: $type) {
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
    "text": "mutation ExerciseFormAddMutation(\n  $name: String!\n  $description: String\n  $type: String\n) {\n  addExercise(name: $name, description: $description, type: $type) {\n    id\n    name\n    description\n    type\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1c04c916b229e3122d9f882d47c054b9';
module.exports = node;
