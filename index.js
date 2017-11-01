/* jshint node: true */
'use strict';

// var debug = require('broccoli-stew').debug;
var map = require('broccoli-stew').map;
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-simple-auth-auth0',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + `/auth0.js/build/auth0${this.app.env === "production" ? ".min" : ""}.js`);
    app.import(app.bowerDirectory + `/auth0-lock/build/lock${this.app.env === "production" ? ".min" : ""}.js`);

    // UGH, for some reason this particular one just doesnt get wrapped correctly for fastboot
    // app.import(app.bowerDirectory + '/auth0-lock-passwordless/build/lock-passwordless.js');
    app.import(`vendor/lock-passwordless${this.app.env === "production" ? ".min" : ""}.js`);

    app.import("vendor/auth0-shim.js");
    app.import("vendor/lock-shim.js");
    app.import("vendor/lock-passwordless-shim.js");
  },

  treeForVendor(tree) {
    tree = map(tree, "!*-shim.js", (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    var auth0Path = this.parent.bowerDirectory + '/auth0.js/build';
    var auth0Tree = new Funnel(this.treeGenerator(auth0Path), {
      include: [ this.app.env === "production" ? "auth0.min.js" : "auth0.js" ]
    });
    auth0Tree = map(auth0Tree, function(content) {
      return 'if (typeof FastBoot === \'undefined\') { ' + content + ' }';
    });

    var lockPath = this.parent.bowerDirectory + '/auth0-lock/build';
    var lockTree = new Funnel(this.treeGenerator(lockPath), {
      include: [ this.app.env === "production" ? "lock.min.js" : "lock.js" ]
    });
    lockTree = map(lockTree, function(content) {
      return 'if (typeof FastBoot === \'undefined\') { ' + content + ' }';
    });

    var passwordlessPath = this.parent.bowerDirectory + '/auth0-lock-passwordless/build';
    var passwordlessTree = new Funnel(this.treeGenerator(passwordlessPath), {
      include: [ this.app.env === "production" ? "lock-passwordless.min.js" : "lock-passwordless.js"],
    });
    passwordlessTree = map(passwordlessTree, function(content) {
      return 'if (typeof FastBoot === \'undefined\') { ' + content + ' }';
    });

    // having problems with the passwordless fastboot guarding, vendoring it for now :-(
    // return new mergeTrees([tree, auth0Tree, lockTree, passwordlessTree]);
    return new mergeTrees([tree, auth0Tree, lockTree ]);
  },
};
