const mongoose = require('mongoose');
const db = mongoose.connect("mongodb+srv://Suryamoorthy:NW4fr3vyOalTh2Mf@cluster0.qkpa7bi.mongodb.net/employmee-db");
const UserSchema = mongoose.Schema({
        username: {
          type: String,
          required: [true, 'Username is required'],
          unique: true,
          trim: true,
          minlength: [3, 'Username must be at least 3 characters long'],
          maxlength: [20, 'Username must be at most 20 characters long'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          trim: true,
          match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: [8, 'Password must be at least 8 characters long'],
          select: false, // Prevent password from being returned in queries
        },
})

const EmployeeSchema = mongoose.Schema({
        firstName: {
          type: String,
          required: [true, 'First name is required'],
          trim: true,
        },
        lastName: {
          type: String,
          required: [true, 'Last name is required'],
          trim: true,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          trim: true,
          match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: [8, 'Password must be at least 8 characters long'],
          select: false, // Prevent password from being returned in queries
        },
        position: {
          type: String,
          required: [true, 'Position is required'],
          trim: true,
        },
        department: {
          type: String,
          required: [true, 'Department is required'],
          trim: true,
        }
})

const User = mongoose.model("User",UserSchema);
const Employee = mongoose/mongoose.model("Employee",EmployeeSchema);

module.exports = {
    User,
    Employee
}
