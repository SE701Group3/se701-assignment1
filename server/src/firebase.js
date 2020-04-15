// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

// import * as serviceAccountJson from './service-account.json';
const serviceAccountJson = require('./service-account.json');

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
    databaseURL: 'https://threader-69e81.firebaseio.com',
});

module.exports = firebaseApp;