/**
 * @flow
 * @relayHash 389f4a03646e939e5568c27fa6313bf9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteExerciseMutationVariables = {|
  id: string
|};
export type DeleteExerciseMutationResponse = {|
  +deleteExercise: ?{|
    +id: ?string
  |}
|};
export type DeleteExerciseMutation = {|
  variables: DeleteExerciseMutationVariables,
  response: DeleteExerciseMutationResponse,
|};
*/


/*
mutation DeleteExerciseMutation(
  $id: ID!
) {
  deleteExercise(id: $id) {
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
    "name": "deleteExercise",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DeleteExerciseMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteExerciseMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteExerciseMutation",
    "id": null,
    "text": "mutation DeleteExerciseMutation(\n  $id: ID!\n) {\n  deleteExercise(id: $id) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cda8dc77aee4f0581aa18d0a5830e2f6';
module.exports = node;
