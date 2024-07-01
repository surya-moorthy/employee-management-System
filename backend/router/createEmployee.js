const express = require("express");
const CreateEmployee = express.Router();
const zod = require('zod');
const { Employee } = require('../database/db');

const EmployeeBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    EmployeeId : zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
    position: zod.string(),
    department: zod.string()
});   

CreateEmployee.post('/createEmployee', async function(req, res) {
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
        const user = await Employee.create(req.body);

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

module.exports ={ CreateEmployee};

