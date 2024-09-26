const express = require("express");
const app = express();

const cookiePaser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./router/User");
const testRoutes = require("./router/Test");
const questionRoutes = require("./router/Question");
const resultRouter = require("./router/Result");

const database = require("./config/database");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connect 
database.connect();

//middleware
app.use(express.json());
app.use(cookiePaser());
app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
    })
)

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/test",testRoutes);
app.use("/api/v1/question",questionRoutes);
app.use("/api/v1/result", resultRouter);

app.use("/", (req,res) => {
    res.send("<h1>Server is runnung...</h1>")
});

//server instance
app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});