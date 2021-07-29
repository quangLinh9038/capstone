const neode = require("../index");

const TripNeo4jService = {
  getShortestPair: async (placeUniquePoint, accommodationUniquePoint) => {
    /**
     *
     */
    const result = await neode.cypher(
      `MATCH (p:Place {unique_point: ${placeUniquePoint}}),
              (a:Accommodation {unique_point: ${accommodationUniquePoint}})
        WITH point({longitude:p.lng, latitude:p.lat}) as p1, 
             point({longitude: a.lng, latitude: a.lat}) as p2, 
             p.name as place, a.name as accommodation
        RETURN place, accommodation, distance(p1, p2) as dist; `
    );
    console.log(result.records[0]);

    // for key in records
    // --> print key

    return result.records;
  },
};

module.exports = TripNeo4jService;
