const parseCookies = (req, res, next) => {
  //read cookie
  //put cookie in an object in req
  //'sessionId=xxxxxxxxxxx'
  let sessionCookie = req.headers.cookie.split('=');
  req.cookies = {};
  req.cookies[sessionCookie[0]] = sessionCookie[1];
  next();
};

module.exports = parseCookies;