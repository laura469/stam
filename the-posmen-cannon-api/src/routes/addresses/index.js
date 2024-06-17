const router = require('express').Router();
const logic = require('./logic');

router.post('/new', async (req, res) => {
  const email = req.email;
  const data = req.body;
  const response = await logic.saveNewEmailAddresses(data);
  res.json('thanks');
});

router.get('/', async (req, res) => {
  const email = req.email;
  const response = await logic.getNewAddresses();
  console.log('response', response);
  if (response) {
    res.json(response);
  } else {
    res.status(404);
  }
});

module.exports = router;
