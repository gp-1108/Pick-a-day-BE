require('dotenv').config();
require('express-async-errors');

// files import
const connectDB = require('./db/connectDB.js');
const eventRouter = require('./routes/event-route.js');
const partecipantRouter = require('./routes/partecipant-route.js');
const {deleteOldEvents} = require('./routines');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// error imports
const errorHandler = require('./middleware/errorHandler.js');
const notFound = require('./middleware/not-found.js');

const express = require('express');
const app = express();
const path = require('path');

app.set('trust proxy', true);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static(path.join(__dirname, '/pick-a-day/build')));
// app.get('/', (req, res) => {
//   res.send('Welcome to my API');
// });
// Routes
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/partecipants', partecipantRouter);

// Error Handler
app.use(errorHandler);
// app.use(notFound);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/pick-a-day/build/index.html'));
});

const port = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    setInterval(deleteOldEvents, 2*60*60*1000);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
