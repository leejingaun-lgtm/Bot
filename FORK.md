# OwnBot changes

OwnBot is derived from the Apache-2.0 portion of https://github.com/milind-soni/OpenMausBot at the commit recorded in UPSTREAM.json. The original LICENSE and NOTICE are retained. OwnBot is not an official OpenMausBot or xAI product.

Changes made for this fork:

- Excluded enterprise/, upstream GitHub automation, and maintainer-local agent configuration.
- Changed the app package, default product and helper names, translated display strings, page titles, and manifest to OwnBot.
- Added an original robot app icon and use a generic rounded-square avatar by default.
- Changed default desktop/server storage to ~/.ownbot and removed automatic legacy data migration.
- Added a source launcher with isolated project-local storage and service readiness checks.
- Disabled upstream analytics independently of inherited opt-in preferences.
- Disabled the inherited desktop cloud purchase offers and prevented the desktop updater from updating an OwnBot package.
- Pointed package metadata and release configuration to the owner's repository; publication remains manual.
- Added focused policy verification and adjusted relevant inherited brand assertions.

Internal OMB identifiers and wire contracts remain compatible with the inherited core. Inherited optional integrations are not a promise of free third-party services. This fork does not activate enterprise entitlements or supply credentials.
