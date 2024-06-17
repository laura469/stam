const { execute } = require('./mysql');
const fs = require('fs');

const main = async () => {
  try {
    const usersDetails = await execute(
      'SELECT LOWER(`email`) as email, `Id` FROM `Addresses`'
    );
    Promise.all(
      usersDetails.map(async (user) => {
        await execute(
          `UPDATE Addresses SET email = '${user.email}' WHERE id=${user.Id}`
        );
        console.log(`User ${user.Id} Update !`);
      })
    ).then(() => console.log('finish Update!'));
  } catch (error) {
    console.log('error : ', error);
  }
};
main().catch((err) => err ?? console.log('err', err));

const main2 = async () => {
  try {
    // Update MailManager Not Useing !!!

    const allDate = await execute('select * from `MailManager`');
    const obj = {};
    allDate.forEach((data) => {
      obj[data.AddressId] = data;
    });
    fs.writeFile(
      './try.text',
      JSON.stringify(Object.values(obj)),
      (err) => err ?? console.log(err)
    );
    console.log();
    Promise.all(
      Object.values(obj).map(async (mail) => {
        await execute(
          `INSERT INTO MailManager2 (Id, AddressId, VersionId)
          VALUES (${mail.Id}, ${mail.AddressId}, ${mail.VersionId});`
        );
        console.log(`User ${mail.Id} Update !`);
      })
    ).then(() => console.log('finish Update!'));
  } catch (error) {
    console.log('error : ', error);
  }
};
