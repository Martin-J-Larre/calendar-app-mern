const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { tokenValidator } = require("../middlewares/tokenValidator");
const fieldValidator = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.use(tokenValidator);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator,
  ],
  createEvent
);
router.get("/", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
