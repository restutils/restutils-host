# Updates to RESTUtils Host

## v0.4.0 (20221030)

* Prevent duplicate object references to protect against circular references.
* Return `result` for primatives instead of `value`.
* Protect against duplicate route names.
* Add option to convert ALL_CAPS names for properties.

## v0.5.0 (20221031)

* Add `publish` option to publish calculated route definition.

## v0.6.0-v0.7.0 (20221106)

* Move utils to a common [RESTUtils Helpers](https://www.npmjs.com/package/restutils-helpers) package.
* Send route info to console in non-prod environments.
* Add wildcard routes ability

## v0.7.1-v0.7.3 (20221107)

* Correct discovery route.  
* Improve error handling.  

## v0.7.4 (20221108)

* Add hosted file/repo/package console output.

## v0.7.5 (20221121)

* Improve error handling in non-prod environments.

## v0.8.0 (20230308)

* Add incoming JWT support for cookies, headers, and querystring parameters.

## v0.9.0 (20230311)

* Improve CORS support to allow multiple origins.

## v0.9.2 (20230323)

* Update `restutils-helpers` for JWT claims.

## v0.10.0 (20230706)

* Switch `restutils-helpers` to `restutils-helpers-js`
