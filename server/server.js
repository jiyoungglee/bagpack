const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const apiRouter = require('./routes/api');

require('dotenv').config()
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to Mongo DB'))
.catch(err => console.log(err));

// Build file
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// API routes
app.use('/api', apiRouter);

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(3000);
