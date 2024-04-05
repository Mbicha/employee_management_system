const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const PASSWORD = process.env.DATABASE_PASSWORD;
console.log(PASSWORD);

// const LIVE_DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// )
const LIVE_DB = `mongodb+srv://mbithi:Mbit4243@sems.fhemfuj.mongodb.net/SEMS?retryWrites=true&w=majority&appName=SEMS`
const uri = "mongodb://127.0.0.1:27017/SEMS"

mongoose.connect(LIVE_DB).then(() => console.log(`Connected to Database`));
