/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NODE_ENV } from 'config';

function middleware(req, res, next) {
  if (NODE_ENV !== 'production') {
    if (!req.secure) {
      res.redirect(`https://${req.headers.host}${req.url}`);
      return;
    }
  }
  next();
}

export function https() {
  return middleware;
}
