(function() {
  function vendorModule() {
    'use strict';

    return { default: typeof FastBoot === "undefined" ? window.Auth0LockPasswordless : function() {} };
	}
  define('auth0-lock-passwordless', [], vendorModule);
})();
