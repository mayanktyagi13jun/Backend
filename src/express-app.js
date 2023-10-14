const express = require("express");
const user = require("./api/user");
const cookieParser = require('cookie-parser');
const HandleErrors = require("./utils/errorHandler");
// const cors = require("cors");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());
  user(app);
  app.all('*', (req, res) => {
    res.status(404).send({ status: 'fail', message: `Can not find ${req.originalUrl} on this Server!`});
  });

  app.use(HandleErrors);
  
};
