const fs = require('fs');
const { execute } = require('../../../mysql');

module.exports = {
  saveNewEmailAddresses,
  getNewAddresses,
};

async function saveNewEmailAddresses(data) {
  const hashMap = {};
  data.forEach((user) => {
    if (user.mail && user.mail.length) {
      if (user.mail.includes('connections692')) {
        console.log('user.mail', user.mail);
        return;
      }
      hashMap[user.mail.toLowerCase()] = {
        ...user,
        mail: user.mail.toLowerCase(),
      };
    }
  });
  const copyHashMap = {};
  await Promise.all(
    Object.keys(hashMap).map(async (mail) => {
      try {
        if (!mail || !mail.length) return;
        const mails = await execute(
          `SELECT *,DATE(createdDate) FROM Addresses
           WHERE email='${mail.toLowerCase()}' AND createdDate > DATE(DATE_SUB(NOW(), INTERVAL 40 DAY))`
        );
        if (mails?.length === 0) {
          copyHashMap[mail] = { ...hashMap[mail] };
        }
      } catch (error) {
        throw error;
      }
    })
  ).catch((err) => console.log('err : ', err));
  let query = '';
  if (!Object.keys(copyHashMap).length) {
    query = '';
  } else {
    query = `insert into Addresses(img,first_name,Linkedin_Name,position,email,founded)
    values ${Object.keys(copyHashMap).reduce(
      (acc, key, currentIndex) =>
        acc +
        `("${copyHashMap[key]?.img?.trim()}","${copyHashMap[
          key
        ]?.firstName?.trim()}","${copyHashMap[key]?.name?.trim()}"
    ,"${copyHashMap[key]?.position?.trim()}","${copyHashMap[key]?.mail
      ?.trim()
      .toLowerCase()}",${0})` +
        (Object.keys(copyHashMap)[Number(currentIndex) + 1] === undefined
          ? ''
          : ','),
      ''
    )}
    ON DUPLICATE KEY UPDATE
    founded = founded + 1`;
  }
  console.log('hashMap', copyHashMap);
  if (!query.length) return;

  try {
    const res = await execute(query);
    console.log('res', res);
    // console.log(query);
  } catch (e) {
    console.log('error and query: ', e, query);
  }
}

async function getNewAddresses() {
  console.log('getNewAddresses');
  try {
    const res = await execute(
      'select * from Addresses where Id not in (select AddressId from MailManager)'
    );
    console.log('res in getNewAddresses!!!:    ', res);
    return res;
  } catch (e) {
    console.log('error!!!!:', e);
    throw e;
  }
}
