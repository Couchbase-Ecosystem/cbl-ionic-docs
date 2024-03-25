---
slug: /
sidebar_position: 1 
title: Overview 
description:
  Couchbase Lite is an embedded, document-style NoSQL database that is syncable and makes it easy to build offline-enabled applications.
---

# Couchbase Lite for Ionic

Couchbase Lite is an embedded, document-style NoSQL database that is syncable and makes it easy to build offline-enabled applications.

Couchbase Lite for Ionic is a plugin implementation of Couchbase Lite for Ionic using Typescript. It has feature parity with Couchbase Lite implementations for other platforms, with a few exceptions.

:::note
This plugin only works with iOS and Android platforms.  Web support is not available.
:::

The version of this plugin is based on supporting Couchbase Lite Enterprise for iOS and Android.  This plugin is not compatible with Couchbase Lite Community Edition.  A [license](https://www.couchbase.com/pricing/) is required to use Couchbase Lite Enterprise edition.  

:::note
Couchbase Lite for Ionic is a community provided solution that is actively developed and maintained by the community.  It is not an official Couchbase product.
:::

## Features
* Offline First
* Documents
 	- Schemaless 
 	- Stored in efficient binary format 
* Blobs
 	- Store and sync binary data, for example JPGs or PDFs
* Queries
 	- SQL++ Query Language
		- Extension of familiar SQL for JSON-like data 
		- Many built-in functions
	- Full-Text Search
	- Indexing
* Data Sync
	- [Couchbase Capella App Servcies](https://www.couchbase.com/products/capella) - Sync your data from your mobile app to the Cloud 
	- Remote On-Premise via [Sync Gateway](https://www.couchbase.com/products/sync-gateway)
* Change Notifications for
	- Documents
	- Collections
	- Queries
	- Replication
* Encryption
	- Full Database 

## Limitations
Some of the features supported by other platform implementations of Couchbase Lite are currently not supported:

* Peer-to-Peer Sync
	- There is no "platform" specific code built into the plugin to allow you to find other peers.

 