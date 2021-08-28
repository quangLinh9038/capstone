// generate SQL
const generateSqlGetLandmarkResult = (model, params, limit, duplicatedUnit) => {
  console.log(
    "🚀 ~ file: SqlUtils.js ~ line 3 ~ generateSqlGetLandmarkResult ~ duplicatedUnit",
    duplicatedUnit
  );

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
