require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const postsRouter = require('./src/routes/posts');
const commentsRouter = require('./src/routes/comments');
const subThreadsRouter = require('./src/routes/subThreads');
const usersRouter = require('./src/routes/users');

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/subThreads', subThreadsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('Hello World!'));

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to database'));
/* eslint-enable no-console */

module.exports = app;
