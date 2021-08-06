const { utils } = require("mocha");

// generate SQL
const generateSqlGetLandmarkResult = (model, paramList, limit) => {
  const subQuery = paramList.map((item) => `"${item}"`).join("+");

  const sql = `SELECT *, ${subQuery} AS point
    FROM "${model}" 
    ORDER BY point DESC LIMIT ${limit};`;

  return sql;
};

module.exports = generateSqlGetLandmarkResult;
