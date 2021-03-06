const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(result => {
    logger.info('Connected to MongoDB');
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB:', err.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
