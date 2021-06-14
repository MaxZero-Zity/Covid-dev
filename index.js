const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/index');
const middleware = require('./middleware/middleware');

app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.all('/', (req, res, next) => {
  res.json({
    status: 'UP',
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(middleware.handlerErrorPath);
app.use(middleware.handlerError);

app.listen(3000, () => {
  console.info('Server start');
});