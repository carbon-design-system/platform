/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const packageJson = require('./package.json');

function getFolderEntrypoints(directory, root = directory) {
  return fs
    .readdirSync(directory)
    .map(filename => {
      const file = path.join(directory, filename);
      const stats = fs.lstatSync(file);

      if (stats.isDirectory()) {
        return getFolderEntrypoints(file, root);
      }

      const relativePath = path.relative(root, file);
      const dirname = path.dirname(relativePath);
      const basename = path.basename(relativePath, '.js');
      const key = path.join(dirname, basename);
      return [[key, file]];
    })
    .reduce((acc, array) => acc.concat(array), [])
    .filter(entrypoint => {
      return entrypoint.length > 0;
    });
}

function getInputConfig(root) {
  const entrypoints = getFolderEntrypoints(root);
  return entrypoints.reduce((acc, entrypoint) => {
    const [key, filepath] = entrypoint;
    return {
      ...acc,
      [key]: filepath,
    };
  }, {});
}

const baseConfig = {
  input: getInputConfig(path.join(__dirname, './src')),
  external: [
    ...Object.keys(packageJson.dependencies),
    // Node.js built-in modules
    'fs',
    'https',
    'path',
    'crypto',
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelrc: false,
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: {
              node: '10',
            },
          },
        ],
        require.resolve('@babel/preset-react'),
      ],
      plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
    }),
  ],
};

module.exports = [
  {
    ...baseConfig,
    output: {
      dir: 'es',
      format: 'esm',
    },
  },
  {
    ...baseConfig,
    output: {
      dir: 'lib',
      format: 'cjs',
    },
  },
];
