/* jshint node: true */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Webpack = require('broccoli-webpack');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const wp = require('webpack');

function transformAMD(name) {
  return { using: [{ transformation: 'amd', as: name }] };
}

function webpackify(name, indexPath) {
  const srcPath = path.join(name, indexPath);
  const fun = new Funnel(path.dirname(require.resolve(srcPath), {
    destDir: name,
    files: ['index.js']
  }));
  return new Webpack([fun], {
    entry: [srcPath],
    output: {
      filename: name + '.js',
      library: name,
      libraryTarget: 'umd'
    },
    plugins: [
      new wp.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(EmberAddon.env())
      })
    ],
    externals: {
      'react'    : { amd: 'react' },
      'react-dom': { amd: 'react-dom' }
    }
  });
}

module.exports = {
  name: 'ember-simple-auth-auth0',
  included: function(app) {
    this._super.included(app);

    app.import('vendor/react.js'                  , transformAMD('react'                  ));
    app.import('vendor/react-dom.js'              , transformAMD('react-dom'              ));
    app.import('vendor/auth0-js.js'               , transformAMD('auth0'                  ));
    app.import('vendor/auth0-lock.js'             , transformAMD('auth0-lock'             ));
    app.import('vendor/auth0-lock-passwordless.js', transformAMD('auth0-lock-passwordless'));

    return app;
  },

  treeForVendor: function(vendorTree) {
      const trees = [];
      if(vendorTree) {
        trees.push(vendorTree);
      }

      // [XA] use webpack to transform the CommonJS libs to AMD so we can import 'em.

      trees.push(webpackify('react'                  , 'react.js'));
      trees.push(webpackify('react-dom'              , 'index.js'));
      trees.push(webpackify('auth0-js'               , 'src/index.js'));
      trees.push(webpackify('auth0-lock'             , 'lib/index.js'));
      trees.push(webpackify('auth0-lock-passwordless', 'lib/index.js'));

      return new MergeTrees(trees);
  }
};
