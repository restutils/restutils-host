function callUpstreamServer(sampleUrl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`Simulated network error when trying to reach ${sampleUrl}`);
    }, 500);
  });
}

const getSome = async () => {

  console.debug('in getSome ... start')

  let response = null;
  try {
    response = await callUpstreamServer('http://servername')
  } catch (ex) {
    console.error(ex);
    response = 'Upstream failure... as expected.'
  }

  console.debug('in getSome ... end')

  return response;
}

module.exports = {
  getSome
}