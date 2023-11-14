const enableCORS = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*",
    "http://localhost:5173",
    "https://extinct-ruby-cap.cyclic.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Max-Age", "1800")
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
};

module.exports = enableCORS;
