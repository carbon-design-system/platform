/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { all } from './all';
export { security } from './security';

export async function applyMiddlewareGroups(server, groups = []) {
  for (const group of groups) {
    await group(server);
  }
  return server;
}
