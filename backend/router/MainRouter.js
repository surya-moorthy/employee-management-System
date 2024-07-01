const express = require("express");
const { CreateEmployee } = require("./createEmployee");
const { ReadEmployee } = require("./readEmployeeID");
const { UpdateRecord } = require("./updateEmployee");
const { DeleteEmployee } = require("./DeleteEmployee");

const MainRouter = express.Router();

MainRouter.use("/",CreateEmployee);
MainRouter.use("/",ReadEmployee);
MainRouter.use("/",UpdateRecord);
MainRouter.use("/",DeleteEmployee);

module.exports={MainRouter};