// DO NOT DO THIS!  THIS EXAMPLE PROVIDED TO TEST CIRCULAR DEPENDENCIES

const helloWorld = `...stayin aliiiiiive!`;

const withParams = (data) => {
  return {
    ...data
  }
}

module.exports = {
  helloWorld,
  withParams
};