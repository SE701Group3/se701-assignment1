const admin = require('firebase-admin');

const serviceAccountJson = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64'));

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  databaseURL: 'https://threader-69e81.firebaseio.com',
});

module.exports = firebaseApp;
