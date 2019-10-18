/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NODE_ENV, LOG_LEVEL } from 'config';
import * as winston from 'winston';

const format =
  NODE_ENV === 'production' ? winston.format.json() : winston.format.simple();

export const logger = winston.createLogger({
  format,
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      exitOnError: NODE_ENV === 'production',
    }),
  ],
});
