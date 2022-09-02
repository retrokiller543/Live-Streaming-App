const router = require("express").Router();

router.post("/auth", async (req, res) => {
  try 
  {
    auth_decision = 
    { 
      uuid: req.body.uuid, 
      user: req.body.user,
      allow_access: false,
    };
    
    res.status(200).send(auth_decision)
  } catch (error) { 
    console.error("Error: " + error); 
    res.status(400).send(error); 
  }
});

module.exports = router;
