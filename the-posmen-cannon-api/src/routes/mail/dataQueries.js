const { execute } = require('../../../mysql');

module.exports = {
  recordSentVersion,
};

async function recordSentVersion(data) {
  const query = `INSERT INTO MailManager(AddressId,VersionId)
VALUES ${data.reduce(
    (acc, addressObj, key) =>
      acc +
      `(${addressObj.id},${addressObj.versionId})` +
      (key < data.length - 1 ? ',' : ''),
    ''
  )}`;
  try {
    const res = await execute(query);
    console.log('res insert :    ', res);
    console.log(query);
  } catch (e) {
    console.log(query);
  }
}
