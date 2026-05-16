export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).send("Unauthorized request");
}

export const requireRole = (...roles) => {
  return async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.session.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};
