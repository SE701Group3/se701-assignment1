const mongoose = require("mongoose");
function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      mongoose
        .connect(
          global.__MONGO_URI__,
          { useNewUrlParser: true, useCreateIndex: true },
          err => {
            if (err) {
              console.error(err);
              process.exit(1);
            }
          }
        )
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      // Use real database
      mongoose
        .connect(process.env.DATABASE_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
