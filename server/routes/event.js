const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { tokenValidator } = require("../middlewares/tokenValidator");
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.use(tokenValidator);

router.post("/", createEvent);
router.get("/", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// router.post("/", tokenValidator, createEvent);
// router.get("/", tokenValidator, getEvent);
// router.put("/:id", tokenValidator, updateEvent);
// router.delete("/:id", tokenValidator, deleteEvent);

module.exports = router;
