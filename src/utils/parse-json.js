const parseJson = (rawJson) => {
  let obj;
  try {
    obj = JSON.parse(rawJson);
  } catch (ex) {
    console.debug(ex);
    return undefined;
  }
  return obj;
};

module.exports = parseJson;
