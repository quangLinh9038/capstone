const generateSubQuery = (params) => {
  let subQuery;

  if (typeof params === "string") {
    subQuery = `"${params}"`;
  } else {
    subQuery = params.map((item) => `"${item}"`).join("+");
  }
  return subQuery;
};

module.exports = generateSubQuery;
