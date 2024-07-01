const express = require("express");
const DeleteEmployee = express.Router();
const zod = require('zod');
const { Employee } = require('../database/db');
const { deleteModel } = require("mongoose");


DeleteEmployee.delete("/removeEmployee",async function(req,res){
    try{
        const employeeId = req.body.id;
        const deleteEmployee = await Employee.findByIdAndDelete(employeeId);
        if(!deleteEmployee){
            res.status(411).json({
                msg : "employee never exists"
            })
        }
        res.status(200).json({
            msg : "Employee records are deleted successfully"
        })
    }
    catch(err){
        res.status(403).json({
            msg :"Error while removing an employee ",
            error : err.message 
        })
    }
})
module.exports = {
    DeleteEmployee
};
