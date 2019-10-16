/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ListWorkouts_Workouts$ref: FragmentReference;
declare export opaque type ListWorkouts_Workouts$fragmentType: ListWorkouts_Workouts$ref;
export type ListWorkouts_Workouts = $ReadOnlyArray<{|
  +id: ?string,
  +datetime: ?any,
  +$refType: ListWorkouts_Workouts$ref,
|}>;
export type ListWorkouts_Workouts$data = ListWorkouts_Workouts;
export type ListWorkouts_Workouts$key = {
  +$data?: ListWorkouts_Workouts$data,
  +$fragmentRefs: ListWorkouts_Workouts$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ListWorkouts_Workouts",
  "type": "Workout",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
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
};
// prettier-ignore
(node/*: any*/).hash = 'db629db29f53713730df86e1455cde68';
module.exports = node;
