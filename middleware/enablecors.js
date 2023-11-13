const enableCORS = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin","https://extinct-ruby-cap.cyclic.app/api/auth");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

module.exports = enableCORS;
