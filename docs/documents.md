---
id: documents 
sidebar_position: 7
---

# Documents 

> Description — _Couchbase Lite Concepts - Data Model - Documents_  
> Related Content — [Databases](databases.md) | [Blobs](blobs.md) | [Indexing](indexing.md)

## Overview

### Document Structure

In Couchbase Lite the term 'document' refers to an entry in the database. You can compare it to a record, or a row in a table.

Each document has an ID or unique identifier. This ID is similar to a primary key in other databases.

You can specify the ID programmatically. If you omit it, it will be automatically generated as a UUID.

:::note
Couchbase documents are assigned to a Collection. The ID of a document must be unique within the Collection it is written to. You cannot change it after you have written the document.
:::

The document also has a value which contains the actual application data. This value is stored as a dictionary of key-value (k-v) pairs. The values can be made of up several different Data Types such as numbers, strings, arrays, and nested objects.

### Data Encoding

The document body is stored in an internal, efficient, binary form called [Fleece](https://github.com/couchbase/fleece#readme). This internal form can be easily converted into a manageable native dictionary format for manipulation in applications.

Fleece data is stored in the smallest format that will hold the value whilst maintaining the integrity of the value.

### Data Types

The Document class offers a set of property accessors for various scalar types, such as:

* Boolean

* Date

* Double

* Float

* Int

* Long

* String

These accessors take care of converting to/from JSON encoding, and make sure you get the type you expect.

In addition to these basic data types Couchbase Lite provides for the following:

* **Dictionary** - Represents a read-only key-value pair collection
* **MutableDictionary** - Represents a writeable key-value pair collection.
* **Array** - Represents a writeable collection of objects.
* **MutableArray** - Represents a writeable collection of objects.
* **Blob** - Represents an arbitrary piece of binary data.

### JSON

Couchbase Lite also provides for the direct handling of JSON data implemented in most cases by the provision of a ToJSON() method on appropriate API classes (for example, on MutableDocument, Dictionary, Blob and Array) — see Working with JSON Data.

## Constructing a Document

An individual document often represents a single instance of an object in application code. A document might be considered equivalent to a row in a relational table; with each of the document's attributes being equivalent to a column.

Documents can contain nested structures. This allows developers to express many-to-many relationships without requiring a reference or junction table; and is naturally expressive of hierarchical data.

Most apps will work with one or more documents, persisting them to a local database and optionally syncing them, either centrally or to the cloud.

In this section we provide an example of how you might create a hotel document, which provides basic contact details and price data.

### Data Model

```typescript
hotel: {
  type: string (value = `hotel`)
  name: string
  address: dictionary {
    street: string
    city: string
    state: string
    country: string
    code: string
  }
  phones: array
  rate: float
}
```

### Open a Database

First open your database. If the database does not already exist, Couchbase Lite will create it for you.

```typescript
const myDatabase = new Database('myDatabaseName', config);
```
See [Databases](https://cbl-ionic.dev/databases) for more information.

### Create a Document

```typescript
let document = new MutableDocument(hotel.id);
```


For more on using Documents, see Document Initializers and Mutability.

### Create a Dictionary

Now create a mutable dictionary (address).

Each element of the dictionary value will be directly accessible via its own key.

```typescript
// Create a new MutableDocument instance
const document = new MutableDocument();

// Now, populate the document as if it's a dictionary named 'address'
document.setString('address.street', '1 Main st.');
document.setString('address.city', 'San Francisco');
document.setString('address.state', 'CA');
document.setString('address.country', 'USA');
document.setString('address.code', '90210');
```

### Create an Array

Since the hotel may have multiple contact numbers, provide a field (phones) as a mutable array.

```typescript
// Create an instance of MutableDocument
const hotelInfo = new MutableDocument();

// Since `setArray` method accepts an array, directly pass the contact numbers as an array
hotelInfo.setArray("phones", ["650-000-0000", "650-000-0001"]);
```

### Populate a Document

Now add your data to the mutable document created earlier. Each data item is stored as a key-value pair.

```typescript
// Assuming address and phones are already defined as shown in previous examples
const address = {
  street: "1 Main st.",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  code: "90210"
};

const phones = ["650-000-0000", "650-000-0001"];

// Create an instance of MutableDocument
let hotelInfo = new MutableDocument();

// Add document type and hotel name as string
hotelInfo.setString("type", "hotel");
hotelInfo.setString("name", "Hotel Java Mo");

// Add average room rate (float)
hotelInfo.setFloat("room_rate", 121.75);

// Add address (dictionary)
hotelInfo.setDictionary("address", address);

// Add phone numbers (array)
hotelInfo.setArray("phones", phones);
```

:::note
Couchbase recommend using a type attribute to define each logical document type.
:::

### Save a Document

With the document now populated, we can persist to our Couchbase Lite database.

```typescript
await collection.save(document);
```

### Close the Database

With your document saved, you can now close our Couchbase Lite database.

```typescript
database.close();
```

## Working with Data

### Date accessors

Couchbase Lite offers Date accessors as a convenience. Dates are a common data type, but JSON doesn’t natively support them, so the convention is to store them as strings in ISO-8601 format.

#### Example 1. Date Getter

This example sets the date on the createdAt property and reads it back using the Document.getDate() accessor method.

```typescript
// Create an instance of MutableDocument
let document = new MutableDocument();

// Set the current date on the "createdAt" property
document.setDate("createdAt", new Date());

// Get the Date 
const date = document.getDate("createdAt");
```

### Using Dictionaries

#### Example 2. Read Only

```typescript
// Get a document by ID
const doc: Document = collection.document('doc1');

// Getting a dictionary from the document's properties
const addressDict = doc.getDictionary('address');

// Access a value with a key from the dictionary
const street = addressDict?.getString('street');

// Iterate over the dictionary
Object.keys(addressDict || {}).forEach(key => {
  console.log(`Key ${key} = ${addressDict[key]}`);
});

// Create a mutable copy
const mutableDict = { ...addressDict };
```

#### Example 3. Mutable

```typescript
// Create a new "dictionary" as a simple JavaScript object
const addressDict = {
  street: "1 Main st.",
  city: "San Francisco",
};

// Create a new mutable document and add the dictionary to its properties
const mutableDoc = new MutableDocument("doc1");
mutableDoc.setDictionary("address", addressDict);

// Simulate saving the document
await collection.save(mutableDoc);
```

### Using Arrays

#### Example 4. Read Only

```typescript
// Getting a phones array from the document's properties
const phonesArray = document.data.phones;

// Get element count
const count = phonesArray.length;

// Access an array element by index
if (count >= 1) { 
  const phone = phonesArray[1]; 
  console.log(`Second phone: ${phone}`);
}

// Iterate over the array
phonesArray.forEach((item, index) => {
  console.log(`Item ${index} = ${item}`);
});

// Create a mutable copy of the array
const mutableArray = [...phonesArray];
```

#### Example 5. Mutable

```typescript
// Create a new mutable document
const document = new MutableDocument();

// Prepare the data for the array
const phones = ["650-000-0000", "650-000-0001"];

// Assign the array to a key in the document
doc.setArray("phones", phones);

// Save the document with the new array to the database
await collection.save(doc);
```

### Using Blobs

For more on working with blobs, see [Blobs](blobs.md)

## Document Initializers

The `MutableDocument` constructor can be used to create a new document where the document ID is randomly generated by the database.

Use the `MutableDocument('specific_id')` initializer to create a new document with a specific ID.

The `Collection.document` method can be used to get a document. If it doesn't exist in the collection, it will return null. This method can be used to check if a document with a given ID already exists in the collection.

#### Example 6. Persist a document

The following code example creates a document and persists it to the database.

```typescript
// Create a new MutableDocument instance
const document = new MutableDocument();

// Set various fields on the document
document.setString('type', 'task');
document.setString('owner', 'todo');
document.setDate('createdAt', new Date());

// Persist the document to the database
await collection.save(document);
```

## Document change events

It is possible to register for document changes. The following example registers for changes to the document with ID user.john and prints the verified_account property when a change is detected.

```typescript
const token = collection.addDocumentChangeListener('user.john', async (change) => {
  const document = await collection.document(change.documentID);
  if (document !== null) {
    console.log(`Status: ${document.getString('verified_account')}`);
  }
});

// Remove the change listener when it is no longer needed
await collection.removeDocumentChangeListener(token);
```

## Document Constraints

Couchbase Lite APIs do not explicitly disallow the use of attributes with the underscore prefix at the top level of document. This is to facilitate the creation of documents for use either in local only mode where documents are not synced.

:::note
`_id`, `_rev` and `_sequence` are reserved keywords and must not be used as top-level attributes — see [Example 13](#example-13-reserved-keys-list).
:::

#### Example 13. Reserved Keys List

* `_attachments`
* `_deleted`
* `_id`
* `_removed`
* `_rev`
* `_sequence`