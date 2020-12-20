const express = require('express');

const np = require('./np');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/np', np);

module.exports = router;
