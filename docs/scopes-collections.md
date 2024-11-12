---
id: scopes-collections 
sidebar_position: 6
---

# Scopes and Collections 

> Description — _Scopes and collections allow you to organize your documents within a database._

:::important AT A GLANCE
**Use collections to organize your content in a database**

For example, if your database contains travel information, airport documents can be assigned to an airports collection, hotel documents can be assigned to a hotels collection, and so on.

* Document names must be unique within their collection.

**Use scopes to group multiple collections**

Collections can be assigned to different scopes according to content-type or deployment-phase (for example, test versus production).

* Collection names must be unique within their scope.

Unlike Couchbase Server and Capella, a scope cannot exist without a collection, thus there is no API to create a scope.  Instead, use the collection API to create a collection in a scope and the scope is created from that API.
:::

## Default Scopes and Collections

Every database you create contains a default scope and a default collection named `_default`.

If you create a document in the database and don't specify a specific scope or collection, it is saved in the default collection, in the default scope.

If you upgrade from a version of Couchbase Lite prior to support for scops and collections, all existing data is automatically placed in the default scope and default collection.

The default scope and collection cannot be dropped.

## Create a Scope and Collection

In addition to the default scope and collection, you can create your own scope and collection when you create a document.

Naming conventions for collections and scopes:

* Must be between 1 and 251 characters in length.
* Can only contain the characters `A-Z`, `a-z`, `0-9`, and the symbols `_`, `-`, and `%`.
* Cannot start with `_` or `%`.
* Scope names must be unique in databases.
* Collection names must be unique within a scope.

:::note
Scope and collection names are case sensitive.
:::

**Example 1. Create a scope and collection**

```typescript
const scopeName = "myScopeName";  
const collectionName = "myCollectionName";  
const collection = await database.createCollection(collectionName, scopeName);
```

In the example above, you can see that Database `.createCollection` function can take two parameters. The second is the scope assigned to the created collection, if this parameter is omitted then a collection of the given name will be assigned to the `_default` scope.

The first parameter is the name of the collection you want to create, in this case `myCollectionName`.

If a collection with the specified name already exists in the specified scope, `Database.createCollection` returns the existing collection.

:::note
You cannot create an empty user-defined scope. A scope is implicitly created and removed by the `Database.createCollection` and `Database.deleteCollection` methods.
:::


## Index a Collection

**Example 2. Index a Collection**

```typescript
 // Define a value index on 'name' and 'documentType'
const valueIndex = IndexBuilder.valueIndex(
    ValueIndexItem.property('name'),
    ValueIndexItem.property('documentType')
);

// Create the value index
const valueIndexName = 'nameTypeIndex';
await collection.createIndex(valueIndexName, valueIndex);
```

## Drop a Collection

**Example 3. Drop a Collection**

```typescript
await database.deleteCollection(collectionName, scopeName);
```

## List Scopes and Collections

**Example 4. List Scopes and Collections**

```typescript
// Get Scopes
const scopes = await database.scopes();

// Get Collections of a particular Scope
const collections = await database.collections(scopeName);
```

## Count Documents in a Collection

The `.count` method returns the number of documents in a given collection, a replacement for the Database `.getCount` method.

```typescript
const count = await collection.count();
```