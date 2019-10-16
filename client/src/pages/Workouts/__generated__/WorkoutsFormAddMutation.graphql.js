/**
 * @flow
 * @relayHash af481eaa074409ebc2eb07e7bd3b96f1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type WorkoutsFormAddMutationVariables = {|
  datetime: any
|};
export type WorkoutsFormAddMutationResponse = {|
  +addWorkout: ?{|
    +id: ?string,
    +datetime: ?any,
  |}
|};
export type WorkoutsFormAddMutation = {|
  variables: WorkoutsFormAddMutationVariables,
  response: WorkoutsFormAddMutationResponse,
|};
*/


/*
mutation WorkoutsFormAddMutation(
  $datetime: DateTime!
) {
  addWorkout(datetime: $datetime) {
    id
    datetime
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "name": "addWorkout",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "datetime",
        "variableName": "datetime"
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
    "name": "WorkoutsFormAddMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "WorkoutsFormAddMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "WorkoutsFormAddMutation",
    "id": null,
    "text": "mutation WorkoutsFormAddMutation(\n  $datetime: DateTime!\n) {\n  addWorkout(datetime: $datetime) {\n    id\n    datetime\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '25e146d260e97c37bc63ab63966cccdf';
module.exports = node;
