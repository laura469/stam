// connect to gmail service nodejs ?

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { execute } = require('./mysql');
const { sendMails } = require('./src/routes/mail/logic');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
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
// lxchhspfpfvfzxaw

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
  const request = await gmail.users.messages.list({
    userId: 'me',
    q: 'in:inbox is:unread category:primary from:Alljobs@alljob.co.il',
  });
  const xx = await Promise.all([
    request.data.messages.map(async (email) => {
      const requestt = await gmail.users.messages.get({
        userId: 'me',
        id: email.id,
        format: 'FULL',
        fields: 'payload',
      });
      console.log('requestt', requestt.data.payload);
      let buff = Buffer.from(requestt.data.payload.body.data, 'base64');
      let text = buff.toString('UTF8');
      await fs.writeFile('text.txt', text);
      console.log('text', text);
    }),
  ]);
  console.log('xx', xx);
  // console.log('messages :', request.data);
}

authorize().then(listLabels).catch(console.error);
