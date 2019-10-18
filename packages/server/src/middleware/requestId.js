/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import uuid from 'uuid/v4';

function middleware(req, res, next) {
  if (req._id) {
    return next();
  }
  req._id = req.get('x-request-id') || uuid();
  return next();
}

export function requestId() {
  return middleware;
}
