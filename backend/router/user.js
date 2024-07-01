const express = require("express");
const UserRouter = express.Router();
const zod = require('zod');
const { Employee } = require('../db');

const EmployeeBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    EmployeeId : zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    position: zod.string(),
    department: zod.string()
});

UserRouter.post('/AddEmployee', async function(req, res) {
    const body = req.body;
    const result = EmployeeBody.safeParse(body);
    if (!result.success) {
        return res.status(400).json({
            msg: "Incorrect Input",
            errors: result.error.issues
        });
    }

    const existingEmployee = await Employee.findOne({
        email: body.email
    });

    if (existingEmployee) {
        return res.status(409).json({
            msg: "Employee already exists"
        });
    }

    try {
        const user = await Employee.create({
            firstName: body.firstName,
            lastName: body.lastName,
            EmployeeId : body.EmployeeId,
            email: body.email,
            password: body.password,
            position: body.position,
            department: body.department
        });

        res.status(201).json({
            msg: "New employee added",
            user
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error adding employee",
            error: error.message
        });
    }
});

UserRouter.get("/readEmployee",async function(req,res){
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
const updateRecordBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    EmployeeId : zod.string().optional(),
    email: zod.string().email().optional(),
    password: zod.string().min(8).optional(),
    position: zod.string().optional(),
    department: zod.string().optional()
});
UserRouter.put("/updateRecord",async function(req,res){
      try{
        const body = req.body;
      const {success} = updateRecordBody.safeParse(body);
      if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
      }
      const updateEmployee = await Employee.updateOne({
         _id: req.body.EmployeeId , // Assuming EmployeeId is passed in req.body
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

UserRouter.delete("/removeEmployee",async function(req,res){
    try{
        const employeeId = req.body.id;
        const deleteEmployee = await Employee.deleteOne({
            _id : employeeId
        })
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
    UserRouter
};
