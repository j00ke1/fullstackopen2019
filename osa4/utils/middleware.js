const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = {
  requestLogger,
  errorHandler
};
