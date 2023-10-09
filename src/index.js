const express = require("express");
const expressApp = require("./express-app");
const { databaseConnection } = require("./database");
const { PORT } = require('./config');

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};

StartServer();
