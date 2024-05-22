---
id: databases
sidebar_position: 4
---

# Databases 

> Description — _Working with Couchbase Lite Databases_  
> Related Content — [Blobs](blobs.md) | [Documents](documents.md) | [Indexing](indexing.md)


## Database Concepts

Databases created on Couchbase Lite can share the same hierarchical structure as Capella databases. This makes it easier to sync data between mobile applications and applications built using Capella.

<div align="center">

![Couchbase Lite Database Hierarchy](/img/Couchbase_Lite_Database_Hierarchy.svg)

_Figure 1. Couchbase Lite Database Hierarchy_

</div>

Although the terminology is different, the structure can be mapped to relational database terms:

Table 1. Relational Database → Couchbase

| Relational database | Couchbase           |
|---------------------|---------------------|
| Database            | Database            |
| Schema              | Scope               |
| Table               | Collection          |

This structure gives you plenty of choices when it comes to partitioning your data. The most basic structure is to use the single default scope with a single default collection; or you could opt for a structure that allow you to split your collections into logical scopes.


<div align="center">

![Couchbase Lite Examples](/img/Couchbase_Lite_Examples.svg)

_Figure 2. Couchbase Lite Examples_

</div>

### Storing local configuration

You may not need to sync all the data related to a particular application. You can set up a scope that syncs data, and a second scope that doesn’t. One reason for doing this is to store local configuration data (such as the preferred screen orientation or keyboard layout). Since this information only relates to a particular device, there is no need to sync it:

- **local data scope** — Contains information pertaining to the device.
- **syncing data scope** — Contains information pertaining to the user, which can be synced back to the cloud for use on the web or another device.

## Managing Couchbase Lite Databases in Ionic

### Initializing the Environment

In an Ionic application using Couchbase Lite, begin by initializing the Capacitor Engine. Subsequently, employ a design pattern such as Context/Provider or Service Locator to maintain and access your database instances throughout the application lifecycle.

**Example: Initializing Capacitor Engine and Database Context**
```javascript
import { CapacitorEngine } from 'cbl-ionic';

const engine = new CapacitorEngine(); // Initialize once, early in your app
```

This configuration ensures seamless interaction between your Ionic app and the underlying native database functionalities, facilitating effective database management.

### Create or Open a Database

To create or open a database, use the Database class from the cbl-cblite package, specifying the database name and optionally, a DatabaseConfiguration for custom settings like the database directory or encryption.

**Example 1. Creating/Opening a Database**

```javascript
import { Database, DatabaseConfiguration } from 'cbl-cblite'; //import the package
```

```javascript
const config = new DatabaseConfiguration();
config.setDirectory('path/to/database'); // Optional
const myDatabase = new Database('myDatabaseName', config);
await myDatabase.open();
```

### Closing a Database

You are advised to incorporate the closing of all open databases into your application workflow.

**Example 2. Closing a Database**

```javascript
await myDatabase.close();
```

## Database Encryption

Couchbase Lite includes the ability to encrypt Couchbase Lite databases. This allows mobile applications to secure data at rest, when it is being stored on the device. The algorithm used to encrypt the database is 256-bit AES.

### Enabling

To enable database encryption in Ionic, use the `DatabaseConfiguration` class to set an encryption key before opening or creating a database. This encryption key must be provided every time the database is accessed.

**Example3. Configure Database Encryption**

```typescript
const dbName = 'my_secure_db';
const encryptionKey = 'my_secret_key';

const config = new DatabaseConfiguration();
config.setEncryptionKey(encryptionKey);

const db = new Database(dbName, config);

await db.open();
```

### Persisting

Couchbase Lite does not persist the key. It is the application’s responsibility to manage the key and store it in a platform-specific secure store such as Apples's [Keystore](https://developer.apple.com/documentation/security/keychain_services) or Android’s [Keystore](https://developer.android.com/privacy-and-security/keystore).

### Opening

An encrypted database can only be opened with the same language package that was used to encrypt it in the first place. So a database encrypted using the Ionic package, and then exported, is readable only by the Ionic package.

## Database Maintenance

From time to time it may be necessary to perform certain maintenance activities on your database, for example to compact the database file, removing unused documents and blobs no longer referenced by any documents.

Couchbase Lite's API provides the Database.performMaintenance method. The available maintenance operations, including compact are as shown in the enum MaintenanceType to accomplish this.

This is a resource intensive operation and is not performed automatically. It should be run on-demand using the API. For questions or issues, please visit the [Couchbase Forums](https://www.couchbase.com/forums/) where you can ask for help and discuss with the community.


## Command Line Tool

cblite is a command-line tool for inspecting and querying Couchbase Lite databases.

You can download and build it from the couchbaselabs [GitHub repository](https://github.com/couchbaselabs/couchbase-mobile-tools/blob/master/README.cblite.md). Note that the cblite tool is not supported by the [Couchbase Support Policy](https://www.couchbase.com/support-policy/).


## Couchbase Lite for VSCode

Couchbase Lite for VSCode is a Visual Studio Code extension that provides a user interface for inspecting and querying Couchbase Lite databases. You can find more information about this extension from it's [GitHub repository](https://github.com/couchbaselabs/vscode-cblite).

## Couchbase Lite for JetBrains

Couchbase Lite for JetBrains is a JetBrains IDE plugin that provides a user interface for inspecting and querying Couchbase Lite databases. You can find more information about this plugin from its [GitHub repository](https://github.com/couchbaselabs/couchbase_jetbrains_plugin).

## Troubleshooting

You should use console logs as your first source of diagnostic information. If the information in the default logging level is insufficient you can focus it on database errors and generate more verbose messages.


```typescript
try {
  await db.setLogLevel(LogDomain.DATABASE, LogLevel.VERBOSE);
  console.log('Database log level set to VERBOSE.');
} catch (error) {
  console.error('Setting log level failed:', error);
}
```









