const express = require('express');

const router = express.Router();
const covidLineMessageRouter = require('./covidLineMessage');
router.all('/', ((req, res, next) => {
  res.send(
    `<div style="margin: auto; width: 50%; padding: 10px">
            <h1>Welcome to Covid Dev API</h1>
    </div>`,
  );
}));
router.use('/getStatusCovid', covidLineMessageRouter);
module.exports = router;