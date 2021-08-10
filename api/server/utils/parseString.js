const parsingStringToObject = (string) => {
  const json = JSON.stringify(string);
  const obj = JSON.parse(json);

  return obj;
};

module.exports = parsingStringToObject;
