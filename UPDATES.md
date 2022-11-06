# Updates to RESTUtils Host

## v0.4.0 (20221030)

* Prevent duplicate object references to protect against circular references.
* Return `result` for primatives instead of `value`.
* Protect against duplicate route names.
* Add option to convert ALL_CAPS names for properties.

## v0.5.0 (20221031)

* Add `publish` option to publish calculated route definition.

## v0.6.0-v0.6.1 (20221106)

* Move utils to a common [RESTUtils Helpers](https://www.npmjs.com/package/restutils-helpers) package.
* Send route info to console in non-prod environments.
