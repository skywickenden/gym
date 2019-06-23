/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ListFoo_Foos$ref: FragmentReference;
declare export opaque type ListFoo_Foos$fragmentType: ListFoo_Foos$ref;
export type ListFoo_Foos = $ReadOnlyArray<{|
  +id: ?string,
  +foobar: ?string,
  +$refType: ListFoo_Foos$ref,
|}>;
export type ListFoo_Foos$data = ListFoo_Foos;
export type ListFoo_Foos$key = {
  +$data?: ListFoo_Foos$data,
  +$fragmentRefs: ListFoo_Foos$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ListFoo_Foos",
  "type": "Foo",
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
      "name": "foobar",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '29e7a17196f37fad6a24ff011ccfeacb';
module.exports = node;
