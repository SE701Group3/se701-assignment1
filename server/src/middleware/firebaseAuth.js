const firebaseApp = require('../firebase');

function firebaseAuthMiddleware(req, res, next) {
  const authorization = req.header('Authorization');
  if (authorization) {
    // using postman to check authorization 
    const postman = authorization.indexOf('Bearer');
    if (postman > -1) {
      token = authorization.split(' ');      
    } else { // not using postman
      token = authorization.split('=');
    }      
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
