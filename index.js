const express = require("express");
var user = require('./users_module');
const port = 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var cors = require('cors');
app.use(cors());

app.use('/user', user);

app.use(function(req, res, next) {
	res.status(404);
	res.send('404: File Not Found');
});

app.listen(process.env.PORT || port, () => {
	console.log("listening 3030...");
});