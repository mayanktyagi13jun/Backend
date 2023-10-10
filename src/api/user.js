const userServices = require("../services/user-service");

module.exports = (app) => {
  const service = new userServices();

  app.post("/signup", async (req, res) => {
    try {
      const { email, password, phone, age, firstname,lastname } = req.body;
      const data = await service.SignUp({ email, password, phone, age, firstname, lastname });
      console.log("here is data", data.toJSON());
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  });

  app.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await service.Signin({ email, password });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
};
