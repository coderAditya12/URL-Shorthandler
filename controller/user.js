const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");

const { setUser } = require("../service/auth");
const handle = async (req, res) => {
  const { email, name, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const valid = await User.findOne({ email, password });

  if (!valid)
    return res.render("login", {
      error: "Invalid email or password",
    });

  const token = setUser( valid);
  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = {
  handle,
  handleLogin,
};
