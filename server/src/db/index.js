const mongoose = require('mongoose');

function connect() {
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          process.exit(1);
        }
      },
    );
  }
  // Use real database
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function drop() {
  return mongoose.connection.dropDatabase();
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, drop, close };
