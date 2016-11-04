Changelog
=========

## v1.0.3 (November 4th, 2016)

- [#10](https://github.com/seawatts/ember-simple-auth-auth0/pull/10) **fix:** Only run beforeSessionExpire if we are not in testing *by [@seawatts](https://github.com/seawatts)*

## v1.0.2 (November 3rd, 2016)

- [#9](https://github.com/seawatts/ember-simple-auth-auth0/pull/9) **fix:** issue where jwt authorizer wasn't adding the jwt to the block *by [@seawatts](https://github.com/seawatts)*
- Fixed an issue where `ember install` or `ember generate` would fail because `rsvp` was in `devDependencies` instead of `dependencies`

## v1.0.1 (November 3rd, 2016)

- [#8](https://github.com/seawatts/ember-simple-auth-auth0/pull/8) **fix:** issue where after auth would not redirect correctly *by [@seawatts](https://github.com/seawatts)*

## v1.0.0 (November 2nd, 2016)

### Breaking Changes

- The session data object is now unified into one object instead of split between the user profile and the jwt info
```json
{
  "authenticated": {
    "authenticator": "authenticator:auth0-impersonation",
    "email": "foo@bar.com",
    "impersonated": true,
    "impersonator": {
      "user_id": "google-oauth2|108251222085688410292",
      "email": "impersonator@bar.com"
    },
    "appMetadata": {
    },
    "userMetadata": {
    },
    "emailVerified": true,
    "clientID": "YwDY9D433veMHC2e27j2BESjlnwF7ry8",
    "updatedAt": "2016-11-02T23:28:06.864Z",
    "userId": "auth0|da71a38d-3d2a-4281-8dfa-504ed0acd598",
    "identities": [
      {
        "user_id": "da71a38d-3de2-4281-8dfa-504ed0acd598",
        "provider": "auth0",
        "connection": "DB",
        "isSocial": false
      }
    ],
    "createdAt": "2016-04-01T21:03:24.847Z",
    "globalClientId": "I22jtMbdaRIz0pOwPdN2Ciuh2uIdzfy2",
    "accessToken": "OfevAkQ5ar42HA2j",
    "idToken": "aaaa.bbb.cccc",
    "idTokenPayload": {
      "iss": "https://domain.auth0.com/",
      "sub": "auth0|da71a382-3dea-2281-8dfa-204ed0acd598",
      "aud": "Yw2Y9D433veMHCred7j0BESjlnwF7r28",
      "exp": 1478629287,
      "iat": 1478129287
    }
  }
}
```

## Bug Fixes

- beforeExpired would never fire. This is now moved into the application-route-mixin and can be overridden by beforeSessionExpired
- auth0.js and lock.js were not being installed correctly

## Enhancements

- Added ember-simple-auth as a dependency