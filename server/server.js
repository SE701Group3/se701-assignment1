const app = require('./app');
const db = require('./src/db');

const port = process.env.PORT || 5001;

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});
