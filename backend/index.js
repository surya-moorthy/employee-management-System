const express = require("express");
const { UserRouter } = require("./router/user");
const app = express();

app.use(express.json());
app.use("/employee",UserRouter);

app.listen(3000);
