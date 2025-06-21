module.exports = (req, res, next) => {
  // Example: you could check headers here
  // if (!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });
  next();
};
