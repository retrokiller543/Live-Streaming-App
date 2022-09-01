const router = require("express").Router();

router.post("/auth", async (req, res) => {
  try {
    respons = {
      result: true,
      text: "[+] Authenticated successfully . . .",
    };
    res.status(200);
    res.send(respons);
    console.log(respons);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
