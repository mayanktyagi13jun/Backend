const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  //DB_URL: 'mongodb://localhost:27017/microservices_customer',
  APP_SECRET: process.env.APP_SECRET,
  JWT_EXPIRES_IN_Access: process.env.JWT_EXPIRES_IN_Access,
  JWT_EXPIRES_IN_Refresh: process.env.JWT_EXPIRES_IN_Refresh,
};
