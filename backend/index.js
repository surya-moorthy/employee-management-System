const express = require("express");
const { MainRouter } = require("./router/MainRouter");

const app = express();

app.use(express.json());
app.use("/employee",MainRouter);

app.listen(3000);
