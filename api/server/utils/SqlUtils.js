/*
 *This utils is to generate SQL query for main interested results
 * @param duplicatedUnit to check duplicated result to avoid when query
 */
const generateSqlGetLandmarkResult = (model, params, limit, duplicatedUnit) => {
  let subQuery;
  let sql;
  if (typeof params === "string") {
    subQuery = `"${params}"`;
  } else {
    subQuery = params.map((item) => `"${item}"`).join("+");
  }

  if (duplicatedUnit !== null) {
    sql = `SELECT *, ${subQuery} AS point
    FROM "${model}"
    WHERE unique_point NOT IN ('${duplicatedUnit}') 
    ORDER BY point DESC LIMIT ${limit}`;
  } else {
    sql = `SELECT *, ${subQuery} AS point
    FROM "${model}" 
    ORDER BY point DESC LIMIT ${limit};`;
  }

  return sql;
};

module.exports = generateSqlGetLandmarkResult;
