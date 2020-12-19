const models = require('../models');
const Promise = require('bluebird');
const sessions = require('../models/session.js');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.sessionId) {
    // If an incoming request has a cookie, the middleware should verify that the cookie is valid (i.e., it is a session that is stored in your database).
    sessions.get({id: req.cookies.sessionId}).then((session) => {
      // session = {id, userID, hash, user: {}}
      if (session) {
        req.session = session;
      } else {

      }

    });

  } else {
    // An incoming request with no cookies should generate a session with a unique hash and store it the sessions database. The middleware function should use this unique hash to set a cookie in the response headers. (Ask yourself: How do I set cookies using Express?).

  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.directPath = () => {
  //
};





// write a createSession middleware function that accesses the parsed cookies on the request, looks up the user data related to that session, and assigns an object to a session property on the request that contains relevant user information. (Ask yourself: what information about the user would you want to keep in this session object?)