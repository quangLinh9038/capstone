const neode = require("../index");

const TripNeo4jService = {
  getShortestPair: async (placeUniquePoint, accommodationUniquePoint) => {
    const firstAccommsPoint = accommodationUniquePoint[0];
    const secondAccommsPoint = accommodationUniquePoint[1];
    const thirdAccommsPoint = accommodationUniquePoint[2];
    const fourthAccommsPoint = accommodationUniquePoint[3];
    const fifthAccommsPoint = accommodationUniquePoint[4];

    /**
     *
     */
    const result = await neode.cypher(
      `MATCH (p:Place {unique_point: ${placeUniquePoint}}),
              (a1:Accommodation {unique_point: ${firstAccommsPoint}}),
              (a2:Accommodation {unique_point: ${secondAccommsPoint}})
      WITH point({longitude:p.lng, latitude:p.lat}) as p1,
            point({longitude: a1.lng, latitude: a1.lat}) as p2,
            point({longitude: a2.lng, latitude: a2.lat}) as p3,
            p.name as p,
            [a1.name, a2.name] as a
      UNWIND  [distance(p1, p2), distance(p1,p3)] as distance
      RETURN p as Place, distance
      ORDER BY distance ASC;`
    );

    // return records from neo4j db
    return result.records[0];
  },
};

module.exports = TripNeo4jService;

// MATCH (p:Place {unique_point: 126.88519765999999}),
//       (a1:Accommodation {unique_point: 126.88088634 }),
//       (a2:Accommodation {unique_point: 126.88467206000001 })
// WITH point({longitude:p.lng, latitude:p.lat}) as p1,
//      point({longitude: a1.lng, latitude: a1.lat}) as p2,
//      point({longitude: a2.lng, latitude: a2.lat}) as p3,
//      p.name as p,
//      [a1.name, a2.name] as a
// UNWIND  [distance(p1, p2),distance(p1,p3)] as distance
// RETURN p as Place, a as Accomm, distance
// ORDER BY distance ASC;
