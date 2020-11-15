const express = require("express");
const app = express();
const connectDB = require('./config/db');
const routes = require("./routes/api/index");
connectDB();
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(express.json({extended: false}));
app.use('/api', routes);
app.get('/',(req, res) => {
	res.send('Server started');
});
app.listen(5000, () => {
	console.log("server running in port 5000");
});