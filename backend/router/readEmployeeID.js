const express = require("express");
const ReadEmployee = express.Router();
const zod = require('zod');
const { Employee } = require('../database/db');

ReadEmployee.get("/readEmployee",async function(req,res){
    try{
        const EmployeeId = req.body.EmployeeId;
        const findEmployee = await Employee.findOne({
            EmployeeId : EmployeeId
        })
        if(!findEmployee){
            res.status(200).json({
                msg : "Employee never existed"
            })
        }
        res.json({
            msg : "Employee is here",
            findEmployee
        })
    }catch(err){
        res.status(500).json({
            msg: "Error reading employee",
            error: err.message
        });
    }
})

module.exports = {ReadEmployee}