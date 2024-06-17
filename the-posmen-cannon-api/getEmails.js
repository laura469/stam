const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { execute } = require('./mysql');
const { sendMails } = require('./src/routes/mail/logic');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://mail.google.com/',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log('client 1', client);
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const emailsNotSent = [];
  let totalsMailCount = 0;
  const yesterdayDate = getYestardayDate();
  const mails = await execute(
    `select id,email from Addresses where Id in (select AddressId from MailManager) AND createdDate >= '${yesterdayDate}'`
  );
  if (!mails?.length)
    throw new Error(`emails not found from yesterday : ${yesterdayDate}`);
  console.log('mails', mails);
  await Promise.all(
    mails.map(async ({ email, id }) => {
      const res = await gmail.users.messages.list({
        userId: 'me',
        q: `to:${email}`,
      });
      if (!res.data.messages?.length) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          emailsNotSent.push({ email, id, versionId: 1 });
        }
      } else {
        totalsMailCount += res.data.messages.length;
      }
    })
  );
  console.log(
    'totalsMailCount',
    totalsMailCount,
    'vs mails.length',
    mails.length
  );
  console.log('emailsNotSent', emailsNotSent);
  if (!emailsNotSent.length) throw new Error('all Fix !');
  console.log(
    'emails',
    emailsNotSent,
    'emailsNotSent count',
    emailsNotSent.length,
    'emails count : ',
    emailsNotSent[emailsNotSent.length - 1]?.id
  );
  const sentEmails = await sendMails(emailsNotSent);
  console.log('sentEmails', sentEmails);
}
const getYestardayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  const padTo2Digits = (num) => num.toString().padStart(2, '0');
  const formatDate = (date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  };
  return formatDate(yesterday);
};

module.exports = {
  authorize,
  listLabels,
};
