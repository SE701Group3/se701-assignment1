const admin = require('firebase-admin');

// const json = require('./service-account.json');

// console.log(JSON.stringify(json));

// const serviceAccountJson = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64'));
const serviceAccountJson = JSON.parse(process.env.SERVICE_ACCOUNT);

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  databaseURL: 'https://threader-69e81.firebaseio.com',
});

module.exports = firebaseApp;
