const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const EmployeeRoutes = require('./routes/index');

const DB = 'mongodb+srv://maviaali:QUcYvBBEWkmHVOC8@cluster0.buk6c5y.mongodb.net/learning-nodejs?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb', 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connection established from cloud"))
.catch(() => console.log("Connection not established"));

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database connection established');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
    });
}

const cors = require('cors');
const corsOptions = {
    origin: 'https://mavia-nodejs.herokuapp.com',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/employee', EmployeeRoutes);