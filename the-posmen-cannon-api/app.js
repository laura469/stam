const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./src/routes');

app.use(bodyParser.json());
app.use(cors());

app.use(router);
const { authorize, listLabels } = require('./getEmails');

const minutes = 0.5;
const the_interval = minutes * 60 * 1000;
setInterval(async function () {
  try {
    authorize()
      .then(listLabels)
      .catch((error) => {
        console.log('error in catch', error);
      });
  } catch (error) {
    console.log('e in catch', error);
  }
}, the_interval);

let port = process.env.PORT ? process.env.PORT : 3100;
app.listen(port, () => {
  console.log('listing to port ' + port);
});
