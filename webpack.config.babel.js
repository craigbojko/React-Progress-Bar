/**
 * Project: react_navigation_progress
 * FilePath: /webpack.config.babel.js
 * File: webpack.config.babel.js
 * Created Date: Sunday, January 14th 2018, 5:50:40 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */

import 'colors'
import npmPackage from './package.json'
import path from 'path'
import webpack from 'webpack'
import precss from 'precss'
import autoprefixer from 'autoprefixer'

const NAMESPACE = 'moteefe'
const WDS_PORT = 3001
const ROOT_SRC = path.join(__dirname, './src')

let lessVars = {
  'modifyVars': {
    'ns': NAMESPACE,
    'ROOT_SRC': '\'' + ROOT_SRC + '\'',
  },
  paths: [
    ROOT_SRC
  ]
}

// Maps ENV vars to object to be passed into bundle & less
let ENVIRONMENT_VARS = {}
const ENV_KEYS = Object.keys(process.env)
for (let i = 0; i < ENV_KEYS.length; i++) {
  ENVIRONMENT_VARS[ENV_KEYS[i]] = JSON.stringify(process.env[ENV_KEYS[i]])
}

// Function produces build header
function getBuildBanner () {
  let date = new Date()
  let copy = ''
  copy += 'Author: Craig Bojko'
  copy += '\nVersion: ' + npmPackage.version
  copy += '\nDate: ' + date.toISOString()
  copy += '\nDescription: ' + npmPackage.description
  // console.log(copy.grey)
  return copy
}

/**
 * Export config - webpack config defaults and base configuration
 * @type {object}
 */
export default {
  cache: true,
  entry: {
    index: path.join(ROOT_SRC, '/index.jsx'),
    wdsHot: 'webpack/hot/dev-server',
    wds: 'webpack-dev-server/client?http://localhost:' + WDS_PORT
  },
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: '/build',
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  devtool: 'cheap-module-source-map', // source-map | eval-source-map
  resolve: {
    alias: {
      '@moteefe': ROOT_SRC,
      '@test': path.join(__dirname, './test')
    },
    modules: [
      ROOT_SRC,
      'node_modules'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(getBuildBanner()),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     drop_debugger: false,
    //     warnings: false
    //   },
    //   mangle: false,
    //   sourcemap: true,
    //   beautify: false,
    //   dead_code: true
    // }),
    new webpack.DefinePlugin({
      'process.env': ENVIRONMENT_VARS
    })
  ],
  module: {
    rules: [
      { test: /\.html$/, use: 'underscore-template-loader' },
      { test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['es2015'] } }
      },
      { test: /\.jsx$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['es2015', 'stage-0', 'react'] } }
      },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { plugins: () => { return [precss, autoprefixer] } } }
        ]
      },
      { test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { autoprefixer: false, modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } },
          { loader: 'postcss-loader', options: { plugins: () => { return [ precss, autoprefixer ] } } },
          { loader: 'less-loader', options: lessVars }
        ]
      }
    ]
  }
}
