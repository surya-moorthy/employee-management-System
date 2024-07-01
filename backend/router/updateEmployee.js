const express = require("express");
const UpdateRecord = express.Router();
const zod = require('zod');
const { Employee } = require('../database/db');

const updateRecordBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    EmployeeId : zod.string().optional(),
    email: zod.string().email().optional(),
    password: zod.string().min(8).optional(),
    position: zod.string().optional(),
    department: zod.string().optional()
});
UpdateRecord.put("/updateRecord",async function(req,res){
      try{
        const body = req.body;
        const EmployeeId = req.params.id;
      const {success} = updateRecordBody.safeParse(body);
      if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
      }
      const updateEmployee = await Employee.updateOne({
         _id: EmployeeId , 
         $set: body // Update all fields in req.body
      })
      res.status(200).json({
        message: "Updated successfully",
        updateEmployee
    })
      }catch(err){
        res.status(500).json({
            message: "Error updating employee record",
            error: err.message
        });
      }
})

module.exports = {
    UpdateRecord
}