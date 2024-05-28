---
id: full-text-search
sidebar_position: 10 
---

# Using Full Text Search 

> Description - _Couchbase Lite database data querying concepts — full text search_
> Related Content - [Indexing](indexes.md)

## Overview

To run a full-text search (FTS) query, you must create a full-text index on the expression being matched. Unlike regular queries, the index is not optional.

The following examples use the data model introduced in Indexing. They create and use an FTS index built from the hotel’s `Overview` text.

## SQL++

### Create Index

SQL++ provides a configuration object to define Full Text Search indexes using `FullTextIndexItem` and `IndexBuilder`.

#### Using SQL++'s FullTextIndexItem and IndexBuilder

```typescript
const indexProperty = FullTextIndexItem.property('overview');
const index = IndexBuilder.fullTextIndex(indexProperty).setIgnoreAccents(false);
await collection.createIndex('overviewFTSIndex', index);
```

### Use Index

FullTextSearch is enabled using the SQL++ match() function.

With the index created, you can construct and run a Full-text search (FTS) query using the indexed properties.

The index will omit a set of common words, to avoid words like "I", "the", "an" from overly influencing your queries. See [full list of these stopwords](https://github.com/couchbasedeps/sqlite3-unicodesn/blob/HEAD/stopwords_en.h).

The following example finds all hotels mentioning *Michigan* in their *Overview* text.

#### Example 2. Using SQL++ Full Text Search

```typescript
const ftsQueryString = `
    SELECT _id, overview 
    FROM _default 
    WHERE MATCH(overviewFTSIndex, 'michigan') 
    ORDER BY RANK(overviewFTSIndex)
`;
const ftsQuery = database.createQuery(ftsQueryString);

const results = await ftsQuery.execute();
results.forEach(result => {
    console.log(result.getString('_id') + ": " + result.getString('overview'));
});
```

## Operation

In the examples above, the pattern to match is a word, the full-text search query matches all documents that contain the word "michigan" in the value of the `doc.overview` property.

Search is supported for all languages that use whitespace to separate words.

Stemming, which is the process of fuzzy matching parts of speech, like "fast" and "faster", is supported in the following languages: Danish, Dutch, English, Finnish, French, German, Hungarian, Italian, Norwegian, Portuguese, Romanian, Russian, Spanish, Swedish and Turkish.

## Pattern Matching Formats

As well as providing specific words or strings to match against, you can provide the pattern to match in these formats.

### Prefix Queries

The query expression used to search for a term prefix is the prefix itself with a "*" character appended to it.

#### Example 5. Prefix query

Query for all documents containing a term with the prefix "lin".

```
"lin*"
```

This will match

    * All documents that contain "linux"
    * And …​ those that contain terms "linear","linker", "linguistic" and so on.

### Overriding the Property Name

Normally, a token or token prefix query is matched against the document property specified as the left-hand side of the `match` operator. This may be overridden by specifying a property name followed by a ":" character before a basic term query. There may be space between the ":" and the term to query for, but not between the property name and the ":" character.

#### Example 6. Override indexed property name

Query the database for documents for which the term "linux" appears in the document title, and the term "problems" appears in either the title or body of the document.

```
'title:linux problems'
```

### Phrase Queries

A `phrase query`is one that retrieves all documents containing a nominated set of terms or term prefixes in a specified order with no intervening tokens.

Phrase queries are specified by enclosing a space separated sequence of terms or term prefixes in double quotes (").

#### Example 7. Phrase query

Query for all documents that contain the phrase "linux applications".

```
"linux applications"
```

### NEAR Queries

Search for a document that contains the phrase "replication" and the term "database" with not more than 2 terms separating the two.

```
"database NEAR/2 replication"
```

### AND, OR & NOT Query Operators::

The enhanced query syntax supports the AND, OR and NOT binary set operators. Each of the two operands to an operator may be a basic FTS query, or the result of another AND, OR or NOT set operation. Operators must be entered using capital letters. Otherwise, they are interpreted as basic term queries instead of set operators.

#### Example 9. Using And, Or and Not

Return the set of documents that contain the term "couchbase", and the term "database".

```
"couchbase AND database"
```

### Operator Precedence

When using the enhanced query syntax, parenthesis may be used to specify the precedence of the various operators.

#### Example 10. Operator precedence

Query for the set of documents that contains the term "linux", and at least one of the phrases "couchbase database" and "sqlite library".

```
'("couchbase database" OR "sqlite library") AND "linux"'
```

## Ordering Results

It’s very common to sort full-text results in descending order of relevance. This can be a very difficult heuristic to define, but Couchbase Lite comes with a ranking function you can use.

In the `OrderBy` array, use a string of the form `Rank(X)`, where `X` is the property or expression being searched, to represent the ranking of the result.












