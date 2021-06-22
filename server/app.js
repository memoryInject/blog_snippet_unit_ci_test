const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

module.exports = () => {
  const app = express();

  // morgan is a shell dev logger
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    app.use(morgan('dev'));
  }

  // express body parser
  app.use(express.json());

  // Set security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  // Apply to all requests
  app.use(limiter);

  // Prevent http params pollution
  app.use(hpp());

  // Enable cors
  app.use(cors());

  app.use('/api/users', userRoutes);
  app.use('/api/blogs', blogRoutes);

  // Serve client page
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'client/build')));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => res.send('api is running'));
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
