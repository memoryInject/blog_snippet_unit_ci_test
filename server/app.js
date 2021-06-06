const express = require('express');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

module.exports = () => {
  const app = express();

  // morgan is a shell dev logger
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // express body parser
  app.use(express.json());

  app.get('/', (req, res) => res.send('api is running'));

  app.use('/api/users', userRoutes);
  app.use('/api/blogs', blogRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
