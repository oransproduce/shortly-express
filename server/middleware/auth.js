const models = require('../models');
const Promise = require('bluebird');
const sessions = require('../models/session.js');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.shortlyid) {
    // If an incoming request has a cookie, the middleware should verify that the cookie is valid (i.e., it is a session that is stored in your database).
    sessions.get({hash: req.cookies.shortlyid}).then((session) => {
      // 'assigns a session object to the request if a session already exists
      if (session) {
        req.session = session;
        next();
        //check if there's a corresponding user
      } else {
        sessions.create().then((result) => {
          sessions.get({ id: result.insertId }).then((session) => {
            req.session = session;
            res.cookie('shortlyid', session.hash);
            next();
          });
        });
      }
    });

  } else {
    sessions.create().then((result) => {
      sessions.get({ id: result.insertId }).then((session) => {
        req.session = session;
        res.cookie('shortlyid', session.hash);
        next();
      });
    });
    // 'assigns a username and userId property to the session object if the session is assigned to a user'????????????

    // An incoming request with no cookies should generate a session with a unique hash and store it the sessions database. The middleware function should use this unique hash to set a cookie in the response headers. (Ask yourself: How do I set cookies using Express?).

  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.directPath = () => {
  //
};

// module.exports.sessionParser = () => {


// };
// 'sets a new cookie on the response when a session is initialized'
// 'assigns a session object to the request if a session already exists
// creates a new hash for each new session'
// 'assigns a username and userId property to the session object if the session is assigned to a user'
//'clears and reassigns a new cookie if there is no session assigned to the cookie'


// write a createSession middleware function that accesses the parsed cookies on the request, looks up the user data related to that session, and assigns an object to a session property on the request that contains relevant user information. (Ask yourself: what information about the user would you want to keep in this session object?)