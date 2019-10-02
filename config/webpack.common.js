const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

const rootPath = (folder) => './packages/' + folder + '/lib/' + folder + '.ts';

const commonConfig = {
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          declaration: true,
        }
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
  ],
};

module.exports = [
  {
    name: 'core',
    entry: rootPath('core'),
    output: {
      path: path.join(__dirname, '../packages/core/dist'),
      filename: 'core.js'
    },
    ...commonConfig,
  },
  {
    name: 'css',
    entry: rootPath('css'),
    output: {
      path: path.join(__dirname, '../packages/css/dist'),
      filename: 'css.js'
    },
    ...commonConfig,
  },
  {
    name: 'svg',
    entry: rootPath('svg'),
    output: {
      path: path.join(__dirname, '../packages/svg/dist'),
      filename: 'svg.js'
    },
    ...commonConfig,
  },
];