const router = require("express").Router();
const User = require("../model/User");
const Str = require("@supercharge/strings");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const { registerValidation, loginValidation } = require("../validation");

// LOAD ENVIROMENT VARIABLES
dotenv.config();

// REGISTER NEW USER
router.post("/register", async (req, res) => {
  // VALIDATE NEW USER
  const { error } = registerValidation(req.body);
  if (error != undefined) return res.status(400).send(error.details[0].message);

  // CHECK IF THE USER EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send(
        `User with this email "${req.body.email}" already exists, please try another email!`
      );
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists)
    return res
      .status(400)
      .send(
        `User with this username "${req.body.username}" already exists, please try another username`
      );

  // SECURE THE PASSWORD
  const salt = await bcrypt.genSalt(parseInt(process.env.ENCRYPT_PASSES));
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // GENERATE RANDOM STRING TO USE IN THE STREAMKEY
  const random_str = Str.random(32);
  // GENERATE UNIKE UUID
  const userID = uuidv4();
  const uuidExist = await User.findOne({ uuid: userID });
  if (uuidExist) {
    userID = uuidv4();
    const uuidExist = await User.findOne({ uuid: userID });
    if (uuidExist)
      return res
        .status(400)
        .send(
          "User with this UUID already exists, please contact our support!"
        );
  }
  // MIX THE USERNAME, UUID AND THE RANDOM STRING TO MAKE A SECURE STREAMKEY
  const streamkey = `${userID}?key=${req.body.username.toLowerCase()}_${random_str}`;
  const streamkeyExist = await User.findOne({ streamkey: streamkey });
  if (streamkeyExist) {
    // GENERATE RANDOM STRING TO USE IN THE STREAMKEY
    const random_str = Str.random(32);
    // MIX THE USERNAME, UUID AND THE RANDOM STRING TO MAKE A SECURE STREAMKEY
    const streamkey = `${userID}?key=${req.body.username.toLowerCase()}_${random_str}`;
    const streamkeyExist = await User.findOne({ streamkey: streamkey });
    if (streamkeyExist)
      return res
        .status(400)
        .send(
          "Streamkey could not be generated, it could be that this user already exists. If thats not the case please contact our support!"
        );
  }

  const user = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    streamkey: streamkey,
    uuid: userID,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser.uuid);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN EXISTING USER
router.post("/login", async (req, res) => {
  // VALIDATE USER
  const { error } = loginValidation(req.body);
  if (error != undefined) return res.status(400).send(error.details[0].message);

  // FIND THE USER IN TH DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Invalid email or password!`);

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid email or password!");

  // CREATE AND ASSIGN JWT
  const token = jwt.sign({ uuid: user.uuid }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(202);
});

module.exports = router;
