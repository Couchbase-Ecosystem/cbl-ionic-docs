---
id: indexes 
sidebar_position: 11 
---

# Indexing

> Description — _Couchbase mobile database indexes and indexing concepts_
> Related Content — [Databases](databases.md) | [Documents](documents.md) | [Indexing](indexes.md)

## Introduction

Before we begin querying documents, let's briefly mention the importance of having an appropriate and balanced approach to indexes.

Creating indexes can speed up the performance of queries. A query will typically return results more quickly if it can take advantage of an existing database index to search, narrowing down the set of documents to be examined.

:::note CONSTRAINTS
Couchbase Lite does not currently support partial value indexes; indexes with non-property expressions. You should only index with properties that you plan to use in the query.
:::

## Creating a new index

You can use SQL++ to create an index

[Example 2](#example-2-create-index) creates a new index for the type and name properties, shown in this data model:

**Example 1. Data Model**

```json
{
    "_id": "hotel123",
    "type": "hotel",
    "name": "The Michigander",
    "overview": "Ideally situated for exploration of the Motor City and the wider state of Michigan. Tripadvisor rated the hotel ...",
    "state": "Michigan"
}
```

The code to create the index will look something like this:

#### Example 2. Create Index

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

## Summary

When planning the indexes you need for your database, remember that while indexes make queries faster, they may also:

* Make writes slightly slower, because each index must be updated whenever a document is updated.
* Make your Couchbase Lite database slightly larger.

So too many indexes may hurt performance. Optimal performance depends on designing and creating the right indexes to go along with your queries.