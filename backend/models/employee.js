// models/employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    location: {
        type: String,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', 
    },
    // Add other fields as needed
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
