---
id: query-result-set
sidebar_position: 5
---

# Query Result Sets 

When querying a database, the results are returned as an array of objects (`ResultSet`). Each object (`Result`) has keys based on the collection names used in the `FROM` statement of your query. If an alias is used, the key will be the alias name. This allows you to access the properties of the results easily and ensures that the structure of your results matches the query structure.

#### Example 1. Query Result Sets

```typescript
const query = database.createQuery('SELECT * FROM inventory.hotel AS hotelItems WHERE city="Medway"');
const resultSet: ResultSet = await query.execute();

for (const result of resultSet) {
    console.log(result['hotelItems'].propertyName);
}
```

In this example, `hotelItems` is the alias used for the collection in the query, and it serves as the key in the `Result` objects within the `ResultSet`.

#### Example 2. Query Result Sets

```typescript
const query = database.createQuery('SELECT hotelItems.*, META().id as docId FROM inventory.hotel AS hotelItems WHERE city="Medway"');
const resultSet: ResultSet = await query.execute();

for (const result of resultSet) {    
    console.log(result['docId']);
    console.log(result['hotelItems'].propertyName);
}
```

n this example, `hotelItems` is the alias used for the collection in the query, and it serves as the key in the `Result` objects within the `ResultSet`. Each `result` object also includes a `docId`, representing the document ID, allowing you to access both the document ID and the hotel item details.


#### Example 3. Query Result Sets

```typescript
const query = database.createQuery(`
    SELECT *
    FROM route
    JOIN airline
    ON route.airlineid = META(airline).id
    WHERE airline.country = "France"
`);
const resultSet: ResultSet = await query.execute();

for (const result of resultSet) {
    console.log(result['route'].propertyName); // Access properties from the route collection
    console.log(result['airline'].propertyName); // Access properties from the airline collection
}
```

In this example, `route` and `airline` are the collections being queried and joined based on the `airlineid`. The `Result` objects within the `ResultSet` contain keys corresponding to these collection names, allowing you to access properties from both the `route` and `airline` collections. The query filters the results to only include airlines from France.
