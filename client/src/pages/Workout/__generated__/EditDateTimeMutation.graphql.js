/**
 * @flow
 * @relayHash a7909b3d7f37dfab3adf5c7676a694e3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditDateTimeMutationVariables = {|
  id: string,
  datetime: any,
|};
export type EditDateTimeMutationResponse = {|
  +editWorkout: ?{|
    +id: ?string,
    +datetime: ?any,
  |}
|};
export type EditDateTimeMutation = {|
  variables: EditDateTimeMutationVariables,
  response: EditDateTimeMutationResponse,
|};
*/


/*
mutation EditDateTimeMutation(
  $id: ID!
  $datetime: DateTime!
) {
  editWorkout(id: $id, datetime: $datetime) {
    id
    datetime
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
    "name": "datetime",
    "type": "DateTime!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "editWorkout",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "datetime",
        "variableName": "datetime"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Workout",
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
        "name": "datetime",
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
    "name": "EditDateTimeMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EditDateTimeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "EditDateTimeMutation",
    "id": null,
    "text": "mutation EditDateTimeMutation(\n  $id: ID!\n  $datetime: DateTime!\n) {\n  editWorkout(id: $id, datetime: $datetime) {\n    id\n    datetime\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '302203eb3a29344760dda26d89d5c0b4';
module.exports = node;
