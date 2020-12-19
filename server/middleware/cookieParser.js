const parseCookies = (req, res, next) => {
  //read cookie
  //put cookie in an object in req
  //'sessionId=xxxxxxxxxxx'
  if (req.headers.cookie) {
    let rawCookies = req.headers.cookie.split('; ');
    req.cookies = {};
    rawCookies.forEach((cookie) => {
      let parsed = cookie.split('=');
      req.cookies[parsed[0]] = parsed[1];
    });
    if (!req.cookies['shortlyid']) {
      req.cookies = {};
    }

  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;