const router = require('express').Router();
const logic = require('./logic');

router.post('/send', async (req, res) => {
  try {
    const email = req.email;
    const data = req.body;
    const mailsCount = await logic.sendMails(data);
    res.json(`mails Count ${mailsCount}`);
  } catch (error) {
    console.log('error :', error);
    res.status(500).send(error);
  }
});
router.post('/send/one', async (req, res) => {
  try {
    const email = req.email;
    const data = req.body;
    const mailsCount = await logic.sendMail(data);
    res.json(`mail Count ${mailsCount}`);
  } catch (error) {
    console.log('error :', error);
    res.status(500).send(error);
  }
});

module.exports = router;
