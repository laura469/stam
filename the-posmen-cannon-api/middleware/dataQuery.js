const { execute } = require('../mysql');

module.exports = {
  getDontTranslatedNames,
  getDontDetectedPics,
  insertToTranslateTable,
  updateGenderDetectionResults,
};

async function getDontTranslatedNames() {
  const query = `select a.first_name as name , tr.english_name from Addresses a 
    left join translations_results tr on a.first_name = tr.english_name
    where tr.english_name is null`;
  const names = await execute(query);
  console.log('names', names);
  return names.map((obj) => obj.name);
}

async function getDontDetectedPics() {
  const query = `select img as url from Addresses a 
                where woman is null and id < 30`;
  const urls = await execute(query);
  return urls.map((obj) => obj.url);
}

async function insertToTranslateTable(names) {
  const query = `insert into translations_results(english_name,hebrew_name)
values ${names.reduce((acc, nameObj, key) => {
    if (!nameObj) return acc;
    return (
      acc +
      `("${nameObj.englishName}","${nameObj.hebrewName}")` +
      (key < names.length - 1 ? ',' : '')
    );
  }, '')}
ON DUPLICATE KEY UPDATE    
created =  CURRENT_TIMESTAMP`;
  const res = await execute(query);
  return res;
}

async function updateGenderDetectionResults(urls) {
  const query = `UPDATE Addresses 
    SET woman = (CASE img ${urls.reduce((acc, url) => {
      return acc + ` WHEN '${url.url}' THEN ${url.woman} `;
    }, '')}
         END)
    WHERE img IN(${urls.reduce((acc, url, key) => {
      return acc + (key === 0 ? '' : ',') + `'${url.url}'`;
    }, '')})`;
  const res = await execute(query);
  return res;
}
