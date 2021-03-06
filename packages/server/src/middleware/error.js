/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { logger } from '../logger';

const defaultErrorMessage = 'Internal server error';

/**
 * Create an error handler with a given logger. The error handler will interpret
 * the thrown `error` and try to construct a standard error response for the
 * service.
 */
export function createErrorHandler(logger) {
  return (error, req, res, next) => {
    const accepts = req.accepts(['application/json', 'text/html', 'text']);

    if (!accepts) {
      res.status(406).send();
      return;
    }

    const status = error.status || 500;
    res.status(status).type(accepts);

    res.status(status).json({
      status,
      code: error.code || 500,
      message:
        error.code === 500
          ? defaultErrorMessage
          : error.message || defaultErrorMessage,
    });
    logger.error(error);
  };
}

export function error() {
  return createErrorHandler(logger);
}
