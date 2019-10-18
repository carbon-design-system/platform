/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hpp from 'hpp';
import helmet from 'helmet';
import sts from 'strict-transport-security';

export function security(server) {
  // Protect against HTTP Parameter Pollution attacks
  server.use(hpp());

  // Secure server by setting various HTTP headers
  server.use(helmet.xssFilter());
  server.use(helmet.frameguard('deny'));
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());

  // TODO: set CSP
  // server.use(helmet.contentSecurityPolicy(contentSecurityPolicy));

  // Add Strict-Transport-Security header
  server.use(sts.getSTS({ 'max-age': { days: 365 } }));

  return server;
}
