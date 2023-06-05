const express = require("express");
const {
  createUser,
  loginUser,
  renewTokenUser,
} = require("../controllers/auth");
router = express.Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/renew", renewTokenUser);

module.exports = router;
