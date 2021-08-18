const generateCypherToFindRoute = (
  uniquePointList,
  singleUniquePoint,
  label1,
  label2
) => {
  const cypher = `UNWIND [${uniquePointList}] AS unwindPoints
    MATCH (${label1} {unique_point: "${singleUniquePoint}"})-[r:DISTANCE_TO]-(${label2} {unique_point: unwindPoints}) 
    RETURN ${label1}.unique_point, ${label2}.unique_point, r.dist
    ORDER BY r.dist ASC;`;

  return cypher;
};
module.exports = generateCypherToFindRoute;
