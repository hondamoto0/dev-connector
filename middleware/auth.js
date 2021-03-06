const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //  Get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({
      msg: "No token , authorization failed"
    });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // decoded => // {user:{id:}}
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
