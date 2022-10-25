const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

module.exports = isNumber;
