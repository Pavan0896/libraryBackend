const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.send("Not Authorised");
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send("Error while veryfying token");
      }
      req.body.role = decoded.role;
      req.body.user_id = decoded.id;
      next();
    });
  } catch (error) {
    res.send("Internal Error");
  }
};

module.exports = auth;
