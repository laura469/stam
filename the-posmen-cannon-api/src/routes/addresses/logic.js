const dataQueries = require('./dataQueries');
const checkDetailsWithApis = require('../../../middleware/checkdetailWithApis');

module.exports = {
  saveNewEmailAddresses,
  getNewAddresses,
};

async function saveNewEmailAddresses(data) {
  const mapData = data.map((obj) => {
    return {
      ...obj,
      firstName: capitalizeFirstLetter(obj.name.split(' ')[0]),
    };
  });
  const response = await dataQueries.saveNewEmailAddresses(mapData);
  console.log('response', response);
  // await checkDetailsWithApis.checkGenderAndTranslateNames();
  return response;
}

async function getNewAddresses() {
  console.log('function getNewAddresses');
  const response = await dataQueries.getNewAddresses();
  return response;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
