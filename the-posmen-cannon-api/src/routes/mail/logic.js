const mail = require('../../../src/mail');
const dataQueries = require('./dataQueries');

module.exports = {
  sendMails,
  sendMail,
};

async function sendMails(data) {
  try {
    let mailsCount = 0;
    await Promise.all(
      data.map(async (obj) => {
        await mail.sendEmail(obj).catch((e) => --mailsCount);
        ++mailsCount;
      })
    );
    console.log('mailsCount', mailsCount);
    // data.forEach((obj) => {});
    const haveAddressId = data.filter((addressObj) => addressObj.Id);
    if (haveAddressId.length) {
      const sentAddresses = haveAddressId.map((obj) => {
        console.log('obj', obj);
        return { id: obj.Id, versionId: obj.versionId };
      });
      console.log(sentAddresses);
      dataQueries.recordSentVersion(sentAddresses);
    }
    return mailsCount;
  } catch (error) {
    console.log('error :', error);
    throw error;
  }
}
async function sendMail(data) {
  try {
    let mailsCount = 0;
    await mail.sendSingelEmail(data[0]).catch((e) => --mailsCount);
    ++mailsCount;
    console.log('mailsCount', mailsCount);
    return mailsCount;
  } catch (error) {
    console.log('error :', error);
    throw error;
  }
}
