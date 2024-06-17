const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('server is running');
});

router.use('/mail', require('./mail'));
router.use('/addresses', require('./addresses'));

module.exports = router;
