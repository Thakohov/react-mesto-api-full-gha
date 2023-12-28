const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleError = require('./middlewares/HandleError');
const router = require('./routes');
const { PORT, DB_URL } = require('./config');
const checkCors = require('./middlewares/corsAllowed');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use(checkCors);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
