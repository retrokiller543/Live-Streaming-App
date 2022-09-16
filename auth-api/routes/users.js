const router = require("express").Router();
const User = require("../model/User");
const Str = require("@supercharge/strings");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const { registerValidation, loginValidation } = require("../validation");

dotenv.config();

router.get("/retUsers", async (req, res) => {
    var query = User.find({}).select('username -_id');
    query.exec((err, data) => 
    {
        if (err) return next(err);
        var JSONRes = { users: null };

        users = Array();
        for(let i = 0; i < data.length; i++) 
        { 
                users.push(data[i].username); 
        }

        JSONRes.users = JSON.stringify(users); 
        res.status(200).send(JSONRes);
    });
});

module.exports = router;
