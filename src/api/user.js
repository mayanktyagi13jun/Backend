const userServices = require("../services/user-service");
const AppError = require('../utils/appError');
module.exports = (app) => {
  const service = new userServices();

  // User Registeration API
  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone, age, firstname, lastname } = req.body;
      const data = await service.SignUp({
        email,
        password,
        phone,
        age,
        firstname,
        lastname,
      });
      //console.log("here is data", data.toJSON());
      return res.status(201).json(data);
    } catch (err) {
      //console.log(err);
      //next(err);
      return next(new AppError(err, 400));
    }
  });

  // User Login API
  app.post("/signin", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.Signin({ email, password });
      res.cookie("jwt", data, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json(data);
    } catch (err) {
      return next(new AppError(err, 404));
    }
  });

  // Refresh Token API

  app.get("/refresh-token", async (req, res) => {
    try {
      const cookie = req.cookies;

      if (!cookie?.jwt)
        return res.status(401).json({ message: "Unauthorized" });
      const refreshToken = cookie.jwt;

      const user = await service.findUserViaToken(refreshToken);
      if(!user) return res.status(401).json({ message: "Unauthorized. No User found in db with token" });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
};
