const router = require("express").Router();
const User = require("../model/User");
const Str = require("@supercharge/strings");

const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error != undefined) return res.status(400).send(error.details[0].message);

  const streamkey = Str.random(256);

  const user = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    streamkey: streamkey,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
