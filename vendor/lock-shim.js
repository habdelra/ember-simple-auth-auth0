(function() {
  function vendorModule() {
    'use strict';
    return { default: typeof FastBoot === "undefined" ? window.Auth0Lock : function() {} };
	}
  define('auth0-lock', [], vendorModule);
})();
