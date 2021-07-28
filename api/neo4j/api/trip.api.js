const neode = require("../index");

const TripNeo4jService = {
  getShortestPair: async (placeUniquePoint, accommodationList) => {
    //
    const a_uniquePoint = accommodationList.map((item) => item);

    await neode.cypher([
      {
        query: `MATCH (p:Place {unique_point: "${placeUniquePoint}"}),
                    (a:Accommodation {unique_point: "${a_uniquePoint}"})
                WITH point({longitude:p.lng, latitude:p.lat}) as p1, 
                    point({longitude: a.lng, latitude: a.lat}) as p2, 
                    p.name as place, a.name as accommodation
                RETURN place, accommodation, distance(p1, p2) as dist; `,
      },
    ]);
  },
};

module.exports = TripNeo4jService;
