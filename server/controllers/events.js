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

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");
    res.status(200).json({
      ok: true,
      message: "CreateEvent",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Events could not be found",
    });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event could not be found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "User is not authorized",
      });
    }

    const eventToUpdate = { ...req.body, user: uid };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventToUpdate, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "Event Updated",
      updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Event could not be updated",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event could not be found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "User is not authorized",
      });
    }
    const eventDeleted = await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      message: "deleteEvent",
      eventDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Event could not be deleted",
    });
  }
};
