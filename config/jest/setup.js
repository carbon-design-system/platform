/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

global.__DEV__ = true;

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  setTimeout(callback, 0);
};
