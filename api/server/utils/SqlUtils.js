// generate SQL
const generateSqlGetLandmarkResult = (model, params, limit) => {
  let subQuery;
  if (typeof params === "string") {
    subQuery = `"${params}"`;
  } else {
    subQuery = params.map((item) => `"${item}"`).join("+");
  }

  const sql = `SELECT *, ${subQuery} AS point
  FROM "${model}" 
  ORDER BY point DESC LIMIT ${limit};`;

  return sql;
};

module.exports = generateSqlGetLandmarkResult;
