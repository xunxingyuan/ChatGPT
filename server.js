require("dotenv").config();
const { createCompletionChatGTP } = require("./chatGTP");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/auth");
const chatRouter = require("./routers/chat");
const imageRouter = require("./routers/image");



const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/chatgpt", chatRouter);
app.use("/other", imageRouter)

app.listen(process.env.PORT || 8000, () => {
  console.log("Listeningserver on port : ", process.env.PORT || 8000);
});
