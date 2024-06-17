const dataQuery = require('./dataQuery');
const translator = require('./translator');
const genderDetection = require('./genderDetection');

module.exports = {
  checkGenderAndTranslateNames,
};

async function checkGenderAndTranslateNames() {
  const res = await Promise.all([translateNames(), detectGender()]);
  console.log(res);
}

async function translateNames() {
  const names = await dataQuery.getDontTranslatedNames();
  const functionArray = names.map((name) => translator.translateText(name));
  const translateResponses = await Promise.all(functionArray);
  const filtered = translateResponses.filter(Boolean);
  const writeRes = await dataQuery.insertToTranslateTable(filtered);
  return writeRes;
}

async function detectGender() {
  const urls = await dataQuery.getDontDetectedPics();
  const genderResponses = await genderDetection.checkGender(urls);
  const filtered = genderResponses.filter(Boolean);
  const writeRes = await dataQuery.updateGenderDetectionResults(filtered);
  return writeRes;
}
