import ActivityEvent from "../models/ActivityEvent.js";

async function getEvents(req, res) {
  try {
    const events = await ActivityEvent.find({
      userId: req.session.userId,
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: `Found ${events.length} event(s)`,
      events,
    });
  } catch (err) {
    console.error("Get events error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error fetching events" });
  }
}

async function deleteEvent(req, res) {
  try {
    const { eventId } = req.params;

    const event = await ActivityEvent.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found" });
    }

    if (event.userId.toString() !== req.session.userId.toString()) {
      return res
        .status(403)
        .send({
          success: false,
          message: "Not authorized to delete this event",
        });
    }

    await event.deleteOne();

    res.status(200).send({
      success: true,
      message: `Event deleted: ${eventId}`,
    });
  } catch (err) {
    console.error("Delete event error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error deleting event" });
  }
}

export { getEvents, deleteEvent };
