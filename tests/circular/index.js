// THIS EXAMPLE PROVIDED TO TEST DUPLICATE REFERENCES

const corvette = () => {
  return 'Vroom!'
}
const yugo = () => {
  return 'I think I can.'
}
const tesla = () => {
  return 'Shhh.'
}
const volkswagon = () => {
  return 'Fahrvergnügen!'
}

const home = {
  cars: {
    corvette,
    tesla
  }
}
const work = {
  cars: {
    tesla
  }
}
const shop = {
  cars: {
    yugo
  }
}
const museum = {
  cars: {
    corvette,
    yugo,
    tesla,
    volkswagon
  }
}

const locations = {
  home,
  work,
  shop,
  museum
}

const husband = {
  locations
}
const wife = {
  locations     // This object will be skipped becuase it's already referenced.
}

const family = {
  husband,
  wife
}

module.exports = {
  helloWorld: `It's still alive!`,
  family
};