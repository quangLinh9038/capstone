// generate SQL

const generateSqlGetLandmarkResult = function (model, paramList) {
  const subQuery = paramList.map((item) => `"${item}"`).join("+");

  const sql = `SELECT *, ${subQuery} AS point
    FROM "${model}" 
    ORDER BY point DESC LIMIT 5;`;

  return sql;
};

module.exports = generateSqlGetLandmarkResult;
