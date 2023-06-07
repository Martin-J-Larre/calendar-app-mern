const express = require("express");
router = express.Router();
const { check } = require("express-validator");
const fieldValidator = require("../middlewares/fieldValidator");
const { tokenValidator } = require("../middlewares/tokenValidator");
const {
  createUser,
  loginUser,
  renewTokenUser,
} = require("../controllers/auth");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name should have at least 6 chacarteres").isLength({
      min: 3,
    }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should have at least 6 chacarteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password should have at least 6 chacarteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);
router.get("/renew", tokenValidator, renewTokenUser);

module.exports = router;
