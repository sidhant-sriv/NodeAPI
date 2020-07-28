const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
app.use(cors());
app.use(express.json());
//for connecting to the database


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
//importing the router files
const heroRouter = require("./routes/hero");
const usersRouter = require("./routes/user");
app.use("/hero", heroRouter);
app.use("/user", usersRouter);

app.listen(port,() => {
  console.log(`Server is running at port ${port}`);
});
