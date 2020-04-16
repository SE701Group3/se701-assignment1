const firebaseApp = require('../firebase');

function firebaseAuthMiddleware(req, res, next) {
  const authorization = req.header('Authorization');
  if (authorization) {
    const token = authorization.split(' ');
    firebaseApp
      .auth()
      .verifyIdToken(token[1])
      .then(decodedToken => {
        req.user = decodedToken;
        next();
      })
      .catch(err => {
        res.status(401).send(err);
      });
  } else {
    res.status(401).send('Authorization header is not found');
  }
}

module.exports = { firebaseAuthMiddleware };
