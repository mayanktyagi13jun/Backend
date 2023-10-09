const express = require("express");
const  user = require("./api/user")
// const cors = require("cors");

module.exports = async (app) => {

   app.use(express.json({ limit: "1mb" }));
   app.use(express.urlencoded({ extended: true, limit: "1mb" }));

   user(app);
    
};