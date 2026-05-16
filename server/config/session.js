import session from "express-session";
import { MongoStore } from "connect-mongo";

function configureSession() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: null,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
      ttl: 30 * 60 * 60 * 24,
    }),
  });
}

export default configureSession;
