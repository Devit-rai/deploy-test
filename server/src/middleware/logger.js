const logger = (req, res, next) => {
  const method = req.method;
  const route = req.originalUrl;

  console.log(`[${new Date().toISOString()}] ${method} ${route}`);
  
  next();
};

export default logger;