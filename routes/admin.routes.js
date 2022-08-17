const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello Admin');
});

module.exports = router;