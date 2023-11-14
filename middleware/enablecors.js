const enableCORS = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin","*","http://localhost:5173","https://extinct-ruby-cap.cyclic.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

module.exports = enableCORS;
