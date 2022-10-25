const add = data => {
  const sum = data.a + data.b;
  return {
    sum
  };
}
const subtract = data => {
  const diff = data.a - data.b;
  return {
    diff
  };
}

module.exports = {
  add,
  subtract
}