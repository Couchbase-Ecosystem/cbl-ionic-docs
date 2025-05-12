---
id: release-notes
sidebar_position: 1
---

# Release Notes 
**1.0.0**
- Included support for [Couchbase Lite 3.2.2](https://docs.couchbase.com/couchbase-lite/current/cbl-whatsnew.html#release-3-2-2-march-2025)
- Fixed issue preventing [creation of second database instance](https://github.com/Couchbase-Ecosystem/cbl-ionic/issues/22)
- Fixed a [session authentication issue](https://github.com/Couchbase-Ecosystem/cbl-ionic/issues/62)
- Updated example app with [Replication](https://github.com/Couchbase-Ecosystem/cbl-ionic/issues/6) and [Query Screens](https://github.com/Couchbase-Ecosystem/cbl-ionic/issues/5)
- Expanded Replication testing
  
**0.2.6**
- Updated Database Save and Database getDocument APIs to fix issue where the document wasn't properly updated in the database nor returned due to changes made in 0.2.4 (regression). 

**0.2.5**
- Updated iOS and Android to use Couchbase Lite 3.2.1
	- Updating users will need to run `pod update` in your iOS project 
	- Updating users should run `npx cap sync` after updating the NPM package

**0.2.4**
- Included support for Couchbase Lite 3.2.0
	- Updating users will need to run `pod update` in your iOS project 
	- Updating users should run `npx cap sync` after updating the NPM package
- Updated Ionic Capacitor version to [version 6](https://ionic.io/blog/announcing-capacitor-6-0)
	- Applications will need to [migrate from version 5 to version 6](https://capacitorjs.com/docs/updating/6-0)
- Updated Documents and MutableDocuments API to match the Native SDK APIs, including default values for each data type
- Updated Blob support with fixes so that blob content is included when retrieving a document vs calling a seperate API `getBlobContent`.  [Blob Documentation](../blobs.md) has been updated with these changes. 
- Updated to fix issue with Android and nested arrays in documents.  Prior to this change, nested arrays would cause a crash in Android.
- Removed dependency on `chia.js` as tests are broken out from cblite-js now.  The [example application](https://github.com/Couchbase-Ecosystem/cbl-ionic/tree/main/example) included in the main repo now uses the new testing library [cblite-js-tests](https://github.com/Couchbase-Ecosystem/cblite-js-tests) for testing.
- Added new [Database Delete API](../databases.md#deleting-a-database) to match the Native SDK APIs
- Added new API for Document Expiration and updated the [Document](../documents.md#document-expiration) documentation to include information about this API. 
- Updated Contribute documentation to include new information about requirements for Ionic Capacitor 6. 
- Updated NPM packages to include security updates for various 3rd party dependencies. 


**0.2.3**
- Included support for Couchbase Lite 3.1.8
- Added support for Scopes and Collections
- Added support for Replication Configuration with Collections
- Updated Bridge iOS Code to Swift
- Updated Bridge Android Code to Kotlin
- Refactored Typescript code into reusable library cblite-js
- Changed Database Maintenance APIs to match the Native SDK APIs

**0.2.2**
- Early Access Release 
