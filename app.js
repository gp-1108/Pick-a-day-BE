require('dotenv').config();
require('express-async-errors');

// files import
const connectDB = require('./db/connectDB.js');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
