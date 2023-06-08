const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSaved = await event.save();

    res.status(200).json({
      ok: true,
      message: "Event created",
      eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Event could not be created",
    });
  }
};

exports.getEvent = async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "CreateEvent",
  });
};

exports.updateEvent = async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "CreateEvent",
  });
};

exports.deleteEvent = async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "CreateEvent",
  });
};
