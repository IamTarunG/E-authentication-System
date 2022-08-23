const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./db.js");
const router = require("./routes/index.js");
const userRouter = require("./routes/users.js");
dotenv.config();
const app = express();
connectToDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/books", router);
app.use("/users", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening to port 5000");
});
