import ActivityEvent from "../models/ActivityEvent.js";

export async function logEvent(userId, action, description, metadata) {
  try {
    const event = await ActivityEvent.create({ userId, action, description, metadata});
    return { success: true, message: `Event logged: ${event._id}` };
  } catch (err) {
    return { success: false, message: `Failed to log event: ${err}` };
  }
}