---
id: database-prebuilt 
sidebar_position: 5
---

# Pre-built Database 

> Description — _How to Handle Pre-Built Couchbase Lite Databases in Your App_  
> Abstract — _This content explains how to include a snapshot of a pre-built database in your package to shorten initial sync time and reduce bandwidth use._

## Overview

*Couchbase Lite* supports pre-built databases. You can pre-load your app with data instead of syncing it from Sync Gateway during startup to minimize consumer wait time (arising from data setup) on initial install and launch of the application.

Avoiding an initial bulk sync reduces startup time and network transfer costs.

It is typically more efficient to download bulk data using the http/ftp stream employed during the application installation than to install a smaller application bundle and then use a replicator to pull in the bulk data.

Pre-loaded data is typically public/shared, non-user-specific data that is static. Even if the data is not static, you can still benefit from preloading it and only syncing the changed documents on startup.

The initial sync of any pre-built database pulls in any content changes on the server that occurred after its incorporation into the app, updating the database.

## To use a Pre-built Database

1. Create a new Couchbase Lite database with the required data set - see [Creating Pre-built database](#creating-pre-built-database).

2. Incorporate the pre-built database with your app bundle as an asset/resource - see [Bundle a Database with an Application](#bundle-a-database-with-an-application).

3. Adjust the start-up logic of your app to check for the presence of the required database. If the database doesn’t already exist, create one using the bundled pre-built database. Initiate a sync to update the data - see [Using Pre-built Database on App Launch](#using-pre-built-database-on-app-launch).

## Creating Pre-built database

These steps should form part of your build and release process:

1. Create a fresh Couchbase Lite database (every time)

:::important
Always start with a fresh database for each app version; this ensures there are no checkpoint issues.

**Otherwise:** You will invalidate the cached checkpoint in the packaged database, and instead reuse the same database in your build process (for subsequent app versions).
:::

2. Pull the data from Sync Gateway into the new Couchbase Lite database

:::important
Ensure the replication used to populate Couchbase Lite database uses the exact same remote URL and replication config parameters (channels and filters) as those your app will use when it is running.

**Otherwise:** …​ there will be a checkpoint mismatch and the app will attempt to pull the data down again

Don’t, for instance, create a pre-built database against a staging Sync Gateway server and use it within a production app that syncs against a production Sync Gateway.
:::

You can use the cblite tool (cblite cp) for this — see: [cblite cp (export, import, push, pull)](https://github.com/couchbaselabs/couchbase-mobile-tools/blob/master/Documentation.md#cp-aka-export-import-push-pull) on GitHub.


3. Create the same indexes the app will use (wait for the replication to finish before doing this).

## Bundle a database with an application

Copy the database into your app package.

Put it in an appropriate place (for example, an assets or resource folder).

Where the platform permits you can zip the database.

**Alternatively:**​ rather than bundling the database within the app, the app could pull the database down from a CDN server on launch.

## Database Encryption

If you are using en encrypted database, note that Database.copy does not change the encryption key. The encryption key specified in the config when opening the database is the encryption key used for both the original database and copied database.

If you copied an un-encrypted database and want to apply encryption to the copy, or if you want to change (or remove) the encryption key applied to the copy:

1. Provide the original encryption-key (if any) in the database copy's configuration using DatabaseConfiguration.getEncryptionKey().

2. Open the database copy

3. Use Database.setEncryptionKey() on the database copy to set the required encryption key.

:::tip
To remove encryption on the copy, provide a null encryption-key.
:::

## Using Pre-built Database on App Launch

1. Locate the pre-packaged database (for example, in the assets or other resource folder)

2. Copy the pre-packaged database to the required location

Use the API's Database.copy method — see: [Example 1](#example-1-decompress-and-copy-database-using-api). This ensures that a unique UUID is generated for each copy.

:::important
Do not copy the database using any other method.

**Otherwise:** Each copy of the app will invalidate the other apps' checkpoints because a new UUID was not generated.
:::

3. Open the database; you can now start querying the data and using it.

4. Start a pull replication, to sync any changes.

The replicator uses the pre-built database's checkpoint as the timestamp to sync from; only documents changed since then are synced.

:::note
Start your normal application logic immediately, unless it is essential to have the absolute up-to-date data set to begin. That way the user is not kept hanging around watching a progress indicator. They can begin interacting with your app whilst any out-of-data data is being updated.
:::

#### Example 1. Decompress and Copy Database using API

```typescript
// Check if the database already exists
if (!await Database.exists(dbName, null)) {
    // Copy the database from the sourcePath to the app's directory
    await Database.copy(sourcePath, dbName, new DatabaseConfiguration());
}
```


