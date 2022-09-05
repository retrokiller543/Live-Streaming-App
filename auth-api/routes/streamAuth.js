const router = require("express").Router();
const User = require("../model/User");

router.post("/auth", async (req, res) => {
  try 
  {
    auth_decision = 
    { 
      uuid: req.body.uuid, 
      user: req.body.user,
      allow_access: false,
    };

    const foundUser = await User.findOne({ $and:
	    					[{ username: { $eq: req.body.user } }, 
						 { uuid: { $eq: req.body.uuid } }] 
    					}); 
    if (foundUser) auth_decision.allow_access = true; 
    
    res.status(200).send(auth_decision);
  } catch (error) { 
    console.error("Error: " + error); 
    res.status(400).send(error); 
  }
});

module.exports = router;
