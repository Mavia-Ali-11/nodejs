const express = require("express");
const api = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

dotenv.config();

// Routes for API
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

const PORT = process.env.PORT || process.env.DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use("/api", api);