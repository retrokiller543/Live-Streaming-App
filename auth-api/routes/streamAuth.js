const router = require("express").Router();

router.post("/auth", async (req, res) => {
  try 
  {
    respons = {
      result: true,
      text: "[+] Authenticated successfully . . .",
    };
 
    res.status(200)
    res.send(respons)
  } catch (error) { res.status(400).send(error); }
});

module.exports = router;
