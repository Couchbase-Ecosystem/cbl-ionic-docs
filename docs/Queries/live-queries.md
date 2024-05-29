---
id: live-queries
sidebar_position: 6 
---

# Live Queries 

> Description - _Couchbase Lite Live Query Concepts_
> Related Content - [SQL++ for Mobile](sqlplusplus.md)

## Activating a Live Query

A live query is a query that, once activated, remains active and monitors the database for changes; refreshing the result set whenever a change occurs. As such, it is a great way to build reactive user interfaces — especially table/list views — that keep themselves up to date.

**So, a simple use case may be:** A replicator running and pulling new data from a server, whilst a live-query-driven UI automatically updates to show the data without the user having to manually refresh. This helps your app feel quick and responsive.

With Couchbase Lite for Ionic, live queries can be watched through:

    * Listener callbacks: `Query.addChangeListener`

Each time you start watching a live query, the query is executed and an initial change notification is dispatched. The query is then kept active and further change notifications are dispatched whenever a change occurs.

#### Example 1. Starting a Live Query - Change Listener

```typescript
// Register a change listener and await the Promise returned from the registration call.
const token = await query.addChangeListener((change) => {  
  if (change.error !== null && change.error !== undefined) {  
    // deal with error...  
  } else {  
    const results = change.results;  
    //loop through ResultSet  
    for (const doc of results) {  
      //do something with doc                   
    }  
  }  
}); 
```

To stop receiving notifications, call `Query.removeChangeListener` with the token that was returned from the registration call. Regardless of the whether the API is synchronous or asynchronous, listeners will stop receiving notifications immediately:

#### Example 2. Stopping a Live Query - Change Listener

```typescript
const token = await query.addChangeListener((change) => { ... });
await query.removeChangeListener(token);
```