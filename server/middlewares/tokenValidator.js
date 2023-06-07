const jwt = require("jsonwebtoken");

const tokenValidator = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Error token is empty or invalid",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: "Error token is invalid",
    });
  }

  next();
};

module.exports = { tokenValidator };
