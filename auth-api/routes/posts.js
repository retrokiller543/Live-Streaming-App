const router = require("express").Router();
const verify = require("./verifyTokens");
const User = require("../model/User");

router.get("/posts", verify, (req, res) => {
  const user = User.findOne({ uuid: req.user.uuid });
  console.log(user);
  res.send(req.user);
});

module.exports = router;
