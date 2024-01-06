// models/department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for managers
        required: true,
    },
    // Add any other fields you need for your department model
    // ...
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
