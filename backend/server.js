const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require('cookie-parser');
require('./config/db.config');

const auth = require('./routes/route_auth');
const department = require('./routes/department')
const location = require('./routes/location');
const designation = require('./routes/designation');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookie());

//routes
app.use('/api/user', auth);
app.use('/api/users', auth);
app.use('/api/departments', department);
app.use('/api/locations', location)
app.use('/api/designations', designation)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
