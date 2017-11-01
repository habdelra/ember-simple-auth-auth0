/* jshint node: true */
'use strict';

// var debug = require('broccoli-stew').debug;
const map = require('broccoli-stew').map;
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const existsSync = require('exists-sync');
const fastbootTransform = require('fastboot-transform');

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

    const lockPath = path.join(this.project.root, this.app.bowerDirectory, 'auth0-lock', 'build');
    const passwordlessPath = path.join(this.project.root, this.app.bowerDirectory, 'auth0-lock-passwordless', 'build');
    const auth0Path = path.join(this.project.root, this.app.bowerDirectory, 'auth0.js', 'build');

    let lockVendorLib = fastbootTransform(new Funnel(lockPath, {
      files: [`lock${this.app.env === "production" ? ".min" : ""}.js`]
    }));

    let passwordlessVendorLib = fastbootTransform(new Funnel(passwordlessPath, {
      files: [`lock-passwordless${this.app.env === "production" ? ".min" : ""}.js`]
    }));

    let auth0VendorLib = fastbootTransform(new Funnel(auth0Path, {
      files: [`auth0${this.app.env === "production" ? ".min" : ""}.js`]
    }));

    // having problems with the passwordless fastboot guarding, vendoring it for now :-(
    // return new mergeTrees([tree, lockVendorLib, passwordlessVendorLib, auth0VendorLib]);
    return new mergeTrees([tree, lockVendorLib, auth0VendorLib]);
  },
};

