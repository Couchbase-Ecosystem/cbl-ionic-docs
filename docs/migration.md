---
id: migration
sidebar_position: 15
---

# Migration 

> Description — Migrating from @ionic-enterprise/couchbase-lite package
> Related Content — [Database](databases.md) | [Scopes/Collections](scopes-collections.md) 

## Information

In the past, Ionic offered a plugin for Couchbase Lite, known as @ionic-enterprise/couchbase-lite. However, this plugin has since been deprecated by Ionic. The Couchbase Developer Experience and Ecosystem team took the original plugin as a foundation and transformed it into the cbl-ionic package. This migration documentation aims to address common challenges you may encounter when transitioning from the Ionic version of the plugin to the new open-source `cbl-ionic` plugin.  

From an architectural standpoint, the `cbl-ionic` plugin bears a strong resemblance to the original plugin. The key difference is that the `cbl-ionic` package is open-source and maintained by the Couchbase Developer Experience and Ecosystem team. The iOS implementation, originally written in Objective-C, has been rewritten in Swift. Similarly, the original Android implementation, which was written in Java, has been replaced with Kotlin.  The primary objective of the `cbl-ionic` plugin is to facilitate access to the latest versions of Couchbase Lite 3.2 >= , while also supporting some of the major new features that the >= 3.2 release offers:  

- Scopes and Collections
- SQL++ Queries
- Database Maintenance

:::note
By updating your app to use this plugin, your database will be instantly upgraded to a 3.2 >= database, enabling support for Scopes and Collections. This behavior mirrors that of the native SDKs for each platform.
:::

## Database Compact / Database Maintenance
Originally the old plugin provided the ability to compact a database using the following API:

```javascript
const db = new Database('myDatabaseName');
await db.open();
await db.compact();
```

This has been changed out with the Database Maintenance API.  Now you can call the performMaintenance function and pass it in one of the values from the MaintenanceType enum:

```javascript
const db = new Database('myDatabaseName');
await db.open();
await db.performMaintenance(MaintenanceType.COMPACT);
```

The MaintenanceType enum includes:
```javascript
export enum MaintenanceType {
  COMPACT = 0,
  REINDEX = 1,
  INTEGRITY_CHECK = 2,
  OPTIMIZE = 3,
  FULL_OPTIMIZE = 4,
}
```

These bring the Ionic package in line with the native SDK's for each platform.  Documentation for the Database Maintenance API can be found [here](databases.md).

## Scopes/Collections

With the introduction of Couchbase Mobile 3.1, the support for Scopes and Collections was added. This feature enhances performance by allowing documents to be stored in different collections based on their type, eliminating the need for indexes to locate documents of a specific type. While indexes can boost query performance, they can also hinder write performance. Therefore, Scopes and Collections offer a way to enhance query performance without relying on indexes.  

For teams that have not yet transitioned to using custom scopes and collections, the "_default" scope and "_default" collection can be utilized. The Database class provides methods to access both the default scope and collection:

```javascript

const db = new Database('myDatabaseName');
await db.open();

const collection = await db.defaultCollection();
``` 

Most operations for documents that were done on the Database API must be done using the Collection API.  Basic CRUD examples are shown below:

### Save Example

**Before**:
```javascript
const doc = new MutableDocument('doc1');
doc.setString("name", "test");
await db.save(doc);    
```

**After**:
```javascript
const doc = new MutableDocument('doc1');
doc.setString("name", "test");
await collection.save(doc); 
```

### Retrieving a Document

**Before**:
```javascript
const doc = await db.getDocument("doc1")
```

**After**:
```javascript
const doc = await collection.document("doc1"); 
```

### Delete a document 

**Before**:
```javascript
const doc = await db.deleteDocument("doc1")
```

**After**:
```javascript
const doc = await collection.deleteDocument("doc1"); 
```
Other APIs have also been moved from the Database class to the Collections class including:
- Purge Document
- Document Expiration
- Document Change Listener
- Create Index
- Delete Index
- Get Indexes

For these APIs use the navigation menu on the left to see the new APIs for Database, Collection, and Indexes.

#### Javascript Docs support
Each function that was deprecated in the Database class has documentation stating that the API has been deprecated and using IDE's like Visual Studio Code should provide you with a warning along with information which API you should use instead.

It is highly recommended that you call the collection version of these functions as the database version of the functions will be removed in a future release.

## Query Builder API Replaced with SQL++

The Query Builder API was removed due to it calling internal - non-public APIs that caused various issues along with hard to manage code.  The Couchbase Mobile SDK team provided a more robust API with SQL++ and the cbl-ionic SDK uses it exclusively for querying the database.  

SQL++ provides a much simpler approach to querying documents:

**Before**
```javascript
const query = QueryBuilder.select(
  SelectResult.expression(Meta.id),
  SelectResult.property('name'),
  SelectResult.property('type'),
)
  .from(DataSource.database(database))
  .where(Expression.property('type').equalTo(Expression.string('hotel')))
  .orderBy(Ordering.expression(Meta.id));

try {
  const resultSet = await(await query.execute()).allResults();
  for (let result of resultSet) {
    console.log(
      'Sample',
      String.format('hotel id -> %s', result.getString('id')),
    );
    console.log(
      'Sample',
      String.format('hotel name -> %s', result.getString('name')),
    );
  }
} catch (e) {
  Log.e('Sample', e.getLocalizedMessage());
}
```

**After**
```javascript
const queryString = "SELECT META().id, name, type FROM _default._default WHERE type = 'hotel' ORDER BY META().id";
try {
    const query = await db.createQuery(queryString);
    const results = await query.execute();
    for (const result of results) {
        console.log('Sample', `hotel id -> ${result.getString('id')}`);
        console.log('Sample', `hotel name -> ${result.getString('name')}`);
    }
} catch (e) {
    Log.e('Sample', e.getLocalizedMessage());
} 
```

## Replication Configuration

With the release of Scopes and Collections comes the change to Replication.  In the past you would set the Replicator to point to a database that you wanted to replicate to.  Now you must set the Replicator to point to a collection or group of collections.  

**Before**
```javascript 
// Create replicators to push and pull changes to and from the cloud.
const targetEndpoint = new URLEndpoint(
  new URI('ws://localhost:4984/projects'),
);
const replConfig = new ReplicatorConfiguration(database, targetEndpoint);
replConfig.setReplicatorType(
  ReplicatorConfiguration.ReplicatorType.PUSH_AND_PULL,
);

// Add authentication.
replConfig.setAuthenticator(new BasicAuthenticator('demo@example.com', 'P@ssw0rd12'));

// Create replicator.
let replicator = new Replicator(replConfig);

// Listen to replicator change events.
replicator.addChangeListener(status => {});

// Start replication.
replicator.start();
```

**After**
```javascript
//setup database and collection
const fileSystem = new FileSystem();
const directoryPath = await fileSystem.getDefaultPath();

const dc = new DatabaseConfiguration();
dc.setDirectory(directoryPath);
const database = new Database('inventory', dc);

await database.open();
const collection = database.getDefaultCollection();

const target = new URLEndpoint('ws://localhost:4984/projects');
const auth = new BasicAuthenticator('demo@example.com', 'P@ssw0rd12');
const config = new ReplicatorConfiguration(target);
const collectionConfig = new CollectionConfiguration();
config.addCollection(collection, collectionConfig);
config.setAuthenticator(auth);

const replicator = await Replicator.create(config);

 //listen to the replicator change events
const token = await replicator.addChangeListener((change) => {
	//check to see if there was an error
   	const error = change.status.getError();
  	if (error !== undefined) {
		//do something with the error
   	}
   	//get the status of the replicator using ReplicatorActivityLevel enum
  	if (change.status.getActivityLevel() ===  ReplicatorActivityLevel.IDLE) {
   		//do something because the replicator is now IDLE
   	}
 });

 // start the replicator without making a new checkpoint
 await replicator.start(false);
```

## Blob Retrieval

The Blob API has been updated to pull a blob content when the document is retrieved.  

**Before**
```javascript 
const doc = await database.getDocument('doc1');
const blobArrayBuffer = await doc.getBlobContent('textBlob', database);
```

**After**
```javascript
const doc = await collection.document('doc1');
const blob = doc.getBlob('textBlob');
const blobArrayBuffer =  blob.getBytes();
```

### New Features

The `cbl-ionic` plugin, in addition to supporting Scopes/Collections and SQL++ from the 3.x release, introduces several new features:

- **Database Delete Function** - a new function in the Database API in addtion to the existing delete function that allows for the deletion of a database by passing the name and path instead of the database object.

- **Database Change Encryption Key**: This new functionality in the Database API allows for the modification of a database's encryption key.
 
- **Document Expiration**: A new method in the Collection API enables the setting and retrieval of a document's expiration date.

- **Document and MutableDocument**: The Document and MutableDocument APIs have been updated to follow the native SDK's business rules for returning values based on the data type.

- **Example App**: The `cbl-ionic` repository includes a `example` folder, which contains a comprehensive application for testing all APIs and features of the cbl-ionic plugin. It also includes a custom test runner for executing end-to-end tests written for the plugin
 
- **Documentation** - Undeniably, one of the most challenging aspects of developing open source software is creating comprehensive documentation. This site addresses this by providing a complete set of documentation, allowing developers to explore the various APIs the plugin has to offers.

## Conclusion

An application can be migrated over from the Ionic version of the Couchbase Lite plugin to the new `cbl-ionic` package.  The new package provides a path to the latest version of Couchbase Lite 3.x and provides support for the new features that the 3.x release provides.  

The new `cbl-ionic` plugin is open source and maintained by the Couchbase Developer Experience and Ecosystem team.  The new plugin is architecturally similar to the original plugin, but there are some differences in the API that will need to be addressed when migrating an application over to the new package.  The new plugin provides support for Scopes and Collections, SQL++ Queries, and Database Maintenance.  The new package also provides a more robust API for querying the database and for setting up replication.  The new package is recommended for all new applications that are using Couchbase Lite and for applications that are looking to migrate over from the Ionic version of the Couchbase Lite plugin. 