/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('dotenv').config();

const {
  HOST = 'localhost',
  LOG_LEVEL = 'info',
  NODE_ENV = 'development',
  PORT = 3000,
  PROTOCOL = 'https',
  SHOULD_REDIRECT_HTTPS = true,
} = process.env;

module.exports = {
  HOST,
  LOG_LEVEL,
  NODE_ENV,
  PORT,
  PROTOCOL,
  SHOULD_REDIRECT_HTTPS,
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
};
