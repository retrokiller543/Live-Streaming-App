const express = require("express");
const app = express();
const fs = require("fs");

app.get("/live", (req, res) => {	
	res.send("<h1>HELLO WORLD!</h1>");
});

app.listen(4000, () => {
	console.log("Listening on port 4000 . . .");
});
