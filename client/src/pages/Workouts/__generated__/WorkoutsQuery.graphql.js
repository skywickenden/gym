/**
 * @flow
 * @relayHash e57d9cb9da35175092474b7c74bf798b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListWorkouts_Workouts$ref = any;
export type WorkoutsQueryVariables = {||};
export type WorkoutsQueryResponse = {|
  +Workouts: ?$ReadOnlyArray<?{|
    +$fragmentRefs: ListWorkouts_Workouts$ref
  |}>
|};
export type WorkoutsQuery = {|
  variables: WorkoutsQueryVariables,
  response: WorkoutsQueryResponse,
|};
*/


/*
query WorkoutsQuery {
  Workouts {
    ...ListWorkouts_Workouts
    id
  }
}

fragment ListWorkouts_Workouts on Workout {
  id
  datetime
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "WorkoutsQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Workouts",
        "storageKey": null,
        "args": null,
        "concreteType": "Workout",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ListWorkouts_Workouts",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WorkoutsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Workouts",
        "storageKey": null,
        "args": null,
        "concreteType": "Workout",
        "plural": true,
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
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "WorkoutsQuery",
    "id": null,
    "text": "query WorkoutsQuery {\n  Workouts {\n    ...ListWorkouts_Workouts\n    id\n  }\n}\n\nfragment ListWorkouts_Workouts on Workout {\n  id\n  datetime\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '5e05c1eb32ea9cdf7b87c7152af5a4f3';
module.exports = node;
