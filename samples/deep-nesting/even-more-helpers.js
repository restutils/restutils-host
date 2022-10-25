const multiply = data => {
  const product = data.a * data.b;
  return {
    product
  };
}
const divide = data => {
  const product = data.a / data.b;
  return {
    product
  };
}

module.exports = {
  multiply,
  divide
}