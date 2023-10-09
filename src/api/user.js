const userServices = require("../services/user-service");

module.exports = (app) => {
  const service = new userServices();

  app.post("/signup", async (req, res) => {
    try {
      const { email, password, phone } = req.body;
      const data = await service.SignUp({ email, password, phone });
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
    } catch (err) {}
  });
};
