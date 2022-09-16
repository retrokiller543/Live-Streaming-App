const router = require("express").Router();
const Session = require("../model/Session");
const User = require("../model/User");

router.post("/auth", async (req, res) => 
{
  try 
  {
    Errors = [];
    if (req.body.type === "newID")
    {
      auth_decision = 
      {
        success: false,
      };

      const session = new Session({
        SESSID: req.body.SESSID,
        username: "null",
      });
      
      await session.save();

      if (Errors.length > 0)
      {
        session.remove({ SESSID: { $eq: req.body.SESSID } });
      }
      else { auth_decision.success = true; }
    }
    else if (req.body.type === "preConnect")
    {
      auth_decision = 
      { 
        uuid: req.body.uuid, 
        user: req.body.user,
        allow_access: false,
      };

      console.dir(`User: ${req.body.user}, uuid: ${req.body.uuid} . . .`);
 
      const UserFound = await User.findOne({ $and: 
			  			                                    [{ username: { $eq: req.body.user } },
                                                   { uuid: { $eq: req.body.uuid } }] 
                                          });
 
      const SESSFound = await Session.findOne({ SESSID: req.body.SESSID });
    
      if (UserFound && SESSFound) 
      {
        console.dir("UserFound: " + UserFound.randStr);
        console.dir("UserFoundReq: " + req.body.rand_str);
        if (UserFound.randStr === req.body.rand_str)
        {
          SESSFound.username = req.body.user;
          await SESSFound.save();
          auth_decision.allow_access = true;
        }
      }
      res.status(200).send(auth_decision);
    }
    else if (req.body.type === "prePublish")
    {
      auth_decision = 
      {
        user: "",
        allow_publish: false,
      };

      const SESSFound = await Session.findOne({ SESSID: req.body.SESSID });
      if (SESSFound && SESSFound.username != "null")
      {
        auth_decision.user = SESSFound.username;
        auth_decision.allow_publish = true;
      } 
      res.status(200).send(auth_decision);
    }
    else if (req.body.type === "doneConnect")
    {
      await Session.deleteOne({ SESSID: req.body.SESSID });
    }
  } catch (error) { res.status(400).send(error); }
});

module.exports = router;
