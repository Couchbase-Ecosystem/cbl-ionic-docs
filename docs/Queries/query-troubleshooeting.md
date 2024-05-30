---
id: query-troubleshooting
sidebar_position: 7
---

# Query Troubleshoooting 

> Description - _Couchbase Lite Queries - Troubleshooting_
> Abstract - _This content describes how to use the Couchbase Lite for Ionic Query API's exlplain method to examine a query.

## Query Explain

### Using

The `Query.explain()` method can provide useful insight when you are trying to diagnose query performance issues and-or optimize queries. To examine how your query is working, either embed the call inside your app (see: Example 1), or use it interactively within a cblite shell (see: Example 2).

#### Example 1. Using Query Explain in App

```typescript
// Create the query
const query = database.createQuery('SELECT META().id AS thisId FROM inventory.hotel WHERE city="Medway"');

// Print the explanation of the query
const explanation = await query.explain();
console.log(explanation);
```

1. Construct your query as normal.
2. Call the query's `explain` method and print it.

#### Example 2. Using Query Explain in cblite

```bash
cblite <your-database-name>.cblite2
(cblite) select --explain domains GROUP BY country ORDER BY country, name
(cblite) query --explain {"GROUP_BY":[[".country"]],"ORDER_BY":[[".country"],[".name"]],"WHAT":[[".domains"]]}
```

1. Within a terminal session open your database with cblite and enter your query.
2. Here the query is entered as an SQL++ query using select.
3. Here the query is entered as a JSON-string using query.

### Output

The output from explain() remains the same whether invoked by an app, or cblite — see [Example 3](#example-3-queryexplain-output) for an example of how it looks.

#### Example 3. Query.explain() Output

```
SELECT fl_result(fl_value(_doc.body, 'domains')) FROM kv_default AS _doc WHERE (_doc.flags & 1 = 0) GROUP BY fl_value(_doc.body, 'country') ORDER BY fl_value(_doc.body, 'country'), fl_value(_doc.body, 'name') 

7|0|0| SCAN TABLE kv_default AS _doc 
12|0|0| USE TEMP B-TREE FOR GROUP BY
52|0|0| USE TEMP B-TREE FOR ORDER BY

{"GROUP_BY":[[".country"]],"ORDER_BY":[[".country"],[".name"]],"WHAT":[[".domains"]]} 
```

This output ([Example 3](#example-3-queryexplain-output)) comprises three main elements:

1. The translated SQL-query, which is not necessarily useful, being aimed more at Couchbase support and-or engineering teams.
2. The [SQLite query plan](https://www.sqlite.org/eqp.html), which gives a high-level view of how the SQL query will be implemented. You can use this to identify potential issues and so optimize problematic queries.
3. The query in JSON-string format, which you can copy-and-paste directly into the *cblite* tool.

## The Query Plan

### Format

The query plan section of the output displays a tabular form of the translated query's execution plan. It primarily shows how the data will be retrieved and, where appropriate, how it will be sorted for navigation and-or presentation purposes. For more on SQLite's Explain Query Plan — see: https://www.sqlite.org/eqp.html.

#### Example 4. A Query Plan

```
7|0|0| SCAN TABLE kv_default AS _doc
12|0|0| USE TEMP B-TREE FOR GROUP BY
52|0|0| USE TEMP B-TREE FOR ORDER BY
```

1. **Retrieval method** — This line shows the retrieval method being used for
   the query; here a sequential read of the database. Something you may well be
   looking to optimize — see [Retrieval Method](#retrieval-method) for more.
2. **Grouping method** --- This line shows that the `GROUP BY` clause used in
   the query requires the data to be sorted and that a b-tree will be used for
   temporary storage — see [Order and Group](#order-and-group).
3. **Ordering method** — This line shows that the `ORDER BY` clause used in the
   query requires the data to be sorted and that a b-tree will be used for
   temporary storage — see [Order and Group](#order-and-group).

### Retrieval Method {#retrieval-method}

The query optimizer will attempt to retrieve the requested data items as
efficiently as possible, which generally will be by using one or more of the
available indexes. The retrieval method shows the approach decided upon by the
optimizer — see [Table 1](#).

#### Table 1. Retrieval Methods

| Retrieval Method | Description                                                                                                                                                                                                                                                 |
| ---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search           | Here the query is able to access the required data directly using keys into the index. Queries using the Search mode are the fastest.                                                                                                                       |
| Scan Index       | Here the query is able to retrieve the data by scanning all or part-of the index (for example when seeking to match values within a range). This type of query is slower than search, but at least benefits from the compact and ordered form of the index. |
| Scan Table       | Here the query must scan the database table(s) to retrieve the required data. It is the slowest of these methods and will benefit most from some form of optimization.                                                                                      |

When looking to optimize a query's retrieval method, consider whether:

- Providing an additional index makes sense.
- You could use an existing index — perhaps by restructuring the query to
  minimize wildcard use, or the reliance on functions that modify the query's
  interpretation of index keys (for example, 'lower').
- You could reduce the data set being requested to minimize the query's
  footprint on the database.

### Order and Group

The `USE TEMP B-TREE FOR` lines in the example indicate that the query requires
sorting to cater for grouping and then sorting again to present the output
results. Minimizing, if not eliminating, this ordering and re-ordering will
obviously reduce the amount of time taken to process your query.

Ask "is the grouping and-or ordering absolutely necessary?": if it isn't, drop
it or modify it to minimize its impact.

## Queries and Indexes

Before we begin querying documents, let's briefly mention the importance of
having an appropriate and balanced approach to indexes.

Creating indexes can speed up the performance of queries. A query will typically
return results more quickly if it can take advantage of an existing database
index to search, narrowing down the set of documents to be examined.

:::note

Couchbase Lite for Ionic does not currently support partial value indexes;
indexes with non-property expressions. You should only index with properties
that you plan to use in the query.

:::

The Query optimizer converts your query into a parse tree that groups zero or
more _and-connected_ clauses together (as dictated by your where conditionals)
for effective query engine processing.

Ideally a query will be be able to satisfy its requirements entirely by either
directly accessing the index or searching sequential index rows. Less good is if
the query must scan the whole index; although the compact nature of most indexes
means this is still much faster than the alternative of scanning the entire
database with no help from the indexes at all.

Searches that begin with or rely upon an inequality with the primary key are
inherently less effective than those using a primary key equality.

## Working with the Query Optimizer

You may have noticed that sometimes a query runs faster on a second run, or
after re-opening the database, or after deleting and recreating an index. This
typically happens when SQL Query Optimizer has gathered sufficient stats to
recognize a means of optimizing a sub-optimal query.

If only those stats were available from the start. In fact they are gathered
after certain events, such as:

- Following index creation
- On a database close
- When running a database compact.

So, if your analysis of the [Query Explain output](#example-3) indicates a
sub-optimal query and your rewrites fail to sufficiently optimize it, consider
compacting the database. Then re-generate the Query Explain and note any
improvements in optimization. They may not, in themselves, resolve the issue
entirely; but they can provide a uesful guide toward further optimizing changes
you could make.

## Wildcard and Like-based Queries

Like-based searches can use the index(es) only if:

- The search-string doesn't start with a wildcard.
- The primary search expression uses a property that is an indexed key.
- The search-string is a constant known at run time (that is, not a value
  derived during processing of the query).

To illustrate this we can use a modified query; replacing a simple equality test
with a `LIKE`.

In [Example 5](#) we use a wildcard prefix and suffix. You can see that the
query plan decides on a retrieval method of `SCAN TABLE`.

:::tip

For more on indexes — see: [Indexing](../indexes.md).

:::

#### Example 5. Like with Wildcard Prefix

```typescript
const queryString = `
  SELECT *
  FROM hotels AS item
  WHERE type LIKE '%hotel%'
`;

const query = database.createQuery(queryString);
console.log(await query.explain());
```

1. The indexed property, `type`, cannot use its index because of the wildcard
   prefix.

#### Example 6. Resulting Query Plan

```console
2|0|0| SCAN TABLE kv_default AS _doc
```

By contrast, by removing the wildcard prefix `%` (in [Example 7](#example-7-like-with-no-wildcard-prefix)), we see
that the query plan's retrieval method changes to become an index search. Where
practical, simple changes like this can make significant differences in query
performance.

#### Example 7. Like with No Wildcard-prefix

```typescript
const queryString = `
  SELECT *
  FROM hotels AS item
  WHERE type LIKE 'hotel%' AND name LIKE '%royal%'
`;

const query = database.createQuery(queryString);
console.log(await query.explain());
```

1. Simply removing the wildcard prefix enables the query optimizer to access the
   `typeIndex`, which results in a more efficient search.

#### Example 8. Resulting Query Plan

```console
3|0|0| SEARCH TABLE kv_default AS _doc USING INDEX typeIndex (<expr>>? AND <expr><?)
```

## Use Functions Wisely

Functions are a very useful tool in building queries, but be aware that they can
impact whether the query-optimizer is able to use your index(es).

For example, you can observe a similar situation to that shown in
[Wildcard and Like-based Queries](#wildcard-queries) when using
`LOWER` on an indexed property.

#### Example 9. WHERE with LOWER Function

```typescript
const queryString = `
  SELECT *
  FROM hotels
  WHERE LOWER(type) = 'hotel'
`;

const query = database.createQuery(queryString);
console.log(await query.explain());
```

1. Here we use `LOWER` in the `WHERE` expression.

#### Example 10. Resulting Query Plan

```console
2|0|0| SCAN TABLE kv_default AS _doc
```

But removing `LOWER`, changes things:

#### Example 11. WHERE with LOWER Function

```typescript
const queryString = `
  SELECT *
  FROM hotels
  WHERE type = 'hotel'
`;

const query = database.createQuery(queryString);
console.log(await query.explain());
```

1. Here we have removed `LOWER` from the `WHERE` expression.

#### Example 12. Query Plan

```console
3|0|0| SEARCH TABLE kv_default AS _doc USING INDEX typeIndex (<expr>=?)
```

Knowing this, you can consider how you create the index; for example, using
`LOWER` when you create the index and then always using
lowercase comparisons.

## Optimization Considerations

Try to minimize the amount of data retrieved. Reduce it down to the few
properties you really do need to achieve the required result.

Consider fetching details lazily. You could break complex queries into
components. Returning just the document IDs, then process the array of document
IDs using either the Document API or a query thats uses the array of document
IDs to return information.

Consider using paging to minimize the data returned when the number of results
returned is expected to be high. Getting the whole lot at once will be slow and
resource intensive: Plus does anyone want to access them all in one go? Instead
retrieve batches of information at a time, perhaps using `LIMIT` and `OFFSET`
clauese to set a starting point for each subsequent batch.

Although, note that using query offsets becomes increasingly less effective as
the overhead of skipping a growing number of rows each time increases. You can
work around this, by instead using ranges of search-key values. If the last
search-key value of batch one was 'x' then that could become the starting point
for your next batch and-so-on.

Optimize document size in design. Smaller documents load more quickly. Break
your data into logical linked units.

Consider Using Full Text Search instead of complex `LIKE` or `REGEX` patterns —
see [Full Text Search](../full-text-search.md).