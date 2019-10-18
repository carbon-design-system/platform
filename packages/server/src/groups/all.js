/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NODE_ENV } from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

export function all(server) {
  server.disable('x-powered-by');

  // Logging middleware
  server.use(morgan('common'));

  // Enable GZIP by default
  server.use(compression());

  server.use(bodyParser.json({ limit: 2 ** 21 /* 2MB */ }));

  return server;
}
