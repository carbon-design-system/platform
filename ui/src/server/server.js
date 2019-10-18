/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  applyMiddlewareGroups,
  all,
  security,
} = require('@carbon/server/lib/groups');
const { error, https, requestId } = require('@carbon/server/lib/middleware');
const { SHOULD_REDIRECT_HTTPS } = require('config');
const express = require('express');

async function create() {
  const server = express();

  await applyMiddlewareGroups(server, [all, security]);

  server.use(requestId());

  if (SHOULD_REDIRECT_HTTPS) {
    server.use(https());
  }

  server.get('*', (req, res) => {
    res.send('OK');
  });

  server.use(error());

  return server;
}

module.exports = {
  create,
};
