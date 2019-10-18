/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { listen, logger } = require('@carbon/server');
const { HOST, PORT, PROTOCOL } = require('config');
const { create } = require('./server');

async function main() {
  const server = await create();
  await listen(server, {
    host: HOST,
    port: PORT,
    protocol: PROTOCOL,
  });
}

main()
  .then(() => {
    process.on('uncaughtException', error => {
      logger.error(error);
    });
  })
  .catch(error => {
    logger.error(error);
  });
