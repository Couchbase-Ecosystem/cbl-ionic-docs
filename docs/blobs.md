---
id: blobs 
sidebar_position: 8
---

# Blobs 

> Description — _Couchbase Lite database data model concepts - blobs_  
> Related Content — [Databases](databases.md) | [Documents](documents.md) | [Indexing](indexing.md)

## Introduction

Couchbase Lite for Ionic uses blobs to store the contents of images, other media files and similar format files as binary objects.

The blob itself is not stored in the document. It is held in a separate content-addressable store indexed from the document and retrieved only on-demand.

When a document is synchronized, the Couchbase Lite replicator adds an `_attachments` dictionary to the document's properties if it contains a blob — see [Figure 1](#figure-1-sample-blob-document).

## Blob Objects

The blob as an object appears in a document as dictionary property — see, for example avatar in [Figure 1](#figure-1-sample-blob-document).

Other properties include `length` (the length in bytes), and optionally `content_type` (typically, its MIME type).

The blob's data (an image, audio or video content) is not stored in the document, but in a separate content-addressable store, indexed by the `digest` property — see [Using Blobs](#using-blobs).

### Constraints

* Couchbase Lite

    Blobs can be arbitrarily large. They are only read on demand, not when you load a the document.

* Capella App Services/Sync Gateway

    The maximum content size is 20 MB per blob. If a document's blob is over 20 MB, the document will be replicated but not the blob.

## Using Blobs

The Blob API lets you access the blob's data content as in-memory data or as a Stream of Uint8Array.

The code in [Example 1](#example-1-working-with-blobs) shows how you might add a blob to a document and save it to the database. Here we use avatar as the property key and a jpeg file as the blob data.

#### Example 1. Working with Blobs

```typescript
// Example function to simulate fetching binary data for an avatar image
const imageData = await fetchAvatarImageData();

// Create a Blob instance with the image data and content type
const avatarBlob = new Blob('image/jpeg', imageData);

// Retrieve an existing document
const document = await collection.document(documentId);

// Assign the Blob to the document under the 'avatar' key
document.setBlob('avatar', avatarBlob);

// Save the updated document back to the database
await collection.save(document);
```

#### Example 2. Get Blob's content

```typescript
// code for setting blob
const encoder = new TextEncoder();
const textBlob = new Blob("text/plain", encoder.encode("Hello World"));
doc.setBlob('textBlob', textBlob);

// code for getting blob's content
const textDecoder = new TextDecoder();
const blobText = await doc.getBlobContent('textBlob', collection);
const textBlobResults = textDecoder.decode(blobText);
```

## Syncing

When a document containing a blob object is synchronized, the Couchbase Lite replicator generates an `_attachments` dictionary with an auto-generated name for each blob attachment. This is different to the `avatar` key and is used internally to access the blob content.

If you view a sync'd blob document in either Capella's Admin Interface or Couchbase Server's Admin Console, you will see something similar to [Figure 1](#figure-1-sample-blob-document), which shows the document with its generated `_attachments` dictionary, including the digest.

#### Figure 1. Sample Blob Document

```typescript
{
  "_attachments": {
    "blob_1": {
      "content_type": "image/jpeg",
      "digest": "sha1-F1Tfe61RZP4zC9UYT6JFmLTh2s8=",
      "length": 8112955,
      "revpos": 2,
      "stub": true
    }
  },
  "avatar": {
    "@type": "blob",
    "content_type": "image/jpeg",
    "digest": "sha1-F1Tfe61RZP4zC9UYT6JFmLTh2s8=",
    "length": 8112955
  }
}
```









