require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const handleError = require('./middlewares/HandleError');
const router = require('./routes');
const { PORT, DB_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

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
