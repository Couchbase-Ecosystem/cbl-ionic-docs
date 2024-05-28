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
