require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const morgan = require("morgan");


const connectDB = require("./db/connect");
const userRoute = require("./routes/userRoute");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


app.use("/api/data/user", userRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("db connected!");
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
