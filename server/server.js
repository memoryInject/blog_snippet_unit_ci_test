const dotenv = require('dotenv');

const app = require('./app');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app().listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightYellow.bold
  )
);
