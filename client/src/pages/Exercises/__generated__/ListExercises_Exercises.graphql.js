/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ListExercises_Exercises$ref: FragmentReference;
declare export opaque type ListExercises_Exercises$fragmentType: ListExercises_Exercises$ref;
export type ListExercises_Exercises = $ReadOnlyArray<{|
  +id: ?string,
  +name: ?string,
  +description: ?string,
  +$refType: ListExercises_Exercises$ref,
|}>;
export type ListExercises_Exercises$data = ListExercises_Exercises;
export type ListExercises_Exercises$key = {
  +$data?: ListExercises_Exercises$data,
  +$fragmentRefs: ListExercises_Exercises$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ListExercises_Exercises",
  "type": "Exercise",
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
};
// prettier-ignore
(node/*: any*/).hash = 'e3e0f880068d9961b801fd3a6c471048';
module.exports = node;
