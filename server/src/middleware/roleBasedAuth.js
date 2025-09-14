const roleBasedAuth = (role) => {
  return (req, res, next) => {
    if (req.user.roles.includes(role)) return next();

    res.status(403).json({ message: "Forbidden" });
  };
};

export default roleBasedAuth;
