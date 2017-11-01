(function() {
  function vendorModule() {
    'use strict';

    // Handle auth0.js v8.x.x
    if (typeof FastBoot === "undefined" && window.auth0 && window.auth0.WebAuth) {
      return { default: window.auth0 };
    }

    return { default: typeof FastBoot === "undefined" ? window.Auth0 : function(){} };
  }
  define('auth0', [], vendorModule);
})();
