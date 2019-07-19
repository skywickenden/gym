/**
 * @flow
 * @relayHash 980e3330d9dcb6ed8def7e1a2483b774
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListExercises_Exercises$ref = any;
export type ExercisesQueryVariables = {||};
export type ExercisesQueryResponse = {|
  +Exercises: ?$ReadOnlyArray<?{|
    +$fragmentRefs: ListExercises_Exercises$ref
  |}>
|};
export type ExercisesQuery = {|
  variables: ExercisesQueryVariables,
  response: ExercisesQueryResponse,
|};
*/


/*
query ExercisesQuery {
  Exercises {
    ...ListExercises_Exercises
    id
  }
}

fragment ListExercises_Exercises on Exercise {
  id
  name
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ExercisesQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Exercises",
        "storageKey": null,
        "args": null,
        "concreteType": "Exercise",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ListExercises_Exercises",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ExercisesQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "Exercises",
        "storageKey": null,
        "args": null,
        "concreteType": "Exercise",
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
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ExercisesQuery",
    "id": null,
    "text": "query ExercisesQuery {\n  Exercises {\n    ...ListExercises_Exercises\n    id\n  }\n}\n\nfragment ListExercises_Exercises on Exercise {\n  id\n  name\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '6fed3c863447b5b8bdc23592354fe790';
module.exports = node;
