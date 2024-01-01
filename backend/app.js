require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { logger } = require('express-winston');
const handleError = require('./middlewares/HandleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const checkCors = require('./middlewares/allowedCors');
const router = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors());

mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger);

app.use(checkCors);
app.use(requestLogger);
app.use(router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
