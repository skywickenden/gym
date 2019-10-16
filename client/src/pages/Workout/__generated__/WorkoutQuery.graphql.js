/**
 * @flow
 * @relayHash 8948ff985c62efd3431e27001d6d67d2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type WorkoutQueryVariables = {|
  workoutId: string
|};
export type WorkoutQueryResponse = {|
  +Workout: ?{|
    +id: ?string,
    +datetime: ?any,
    +exercisesr: ?$ReadOnlyArray<?string>,
  |}
|};
export type WorkoutQuery = {|
  variables: WorkoutQueryVariables,
  response: WorkoutQueryResponse,
|};
*/


/*
query WorkoutQuery(
  $workoutId: ID!
) {
  Workout(id: $workoutId) {
    id
    datetime
    exercisesr
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "workoutId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "Workout",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "workoutId"
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "exercisesr",
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
    "name": "WorkoutQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "WorkoutQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "WorkoutQuery",
    "id": null,
    "text": "query WorkoutQuery(\n  $workoutId: ID!\n) {\n  Workout(id: $workoutId) {\n    id\n    datetime\n    exercisesr\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b706a88d9899268c7b53a0452b0079d3';
module.exports = node;
