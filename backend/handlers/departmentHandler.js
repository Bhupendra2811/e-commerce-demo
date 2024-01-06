// departmentHandler.js
const departmentModule = require('../modules/departmentModule');
const authHandler = require('../handlers/authHandler')
// Implement routes for department creation, update, delete, and fetching
const jwt = require('jsonwebtoken');

const checkManagerRole = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Assuming the token is sent in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
    }

    try {
        console.log("tokenee", token)
        const decoded = jwt.verify(token, 'testKey');
        console.log("decodeToken", decoded)// Replace 'your-secret-key' with your actual secret key
        // const userRole = await authHandler.getLoginRole(decoded.roleId);
        const { _id } = decoded
        const userRole = await authHandler.getUserLogedInRole(_id);
        console.log("userRole", userRole)
        if (userRole !== 'manager') {
            return res.status(403).json({ message: 'Only managers can perform this action.' });
        }

        // Attach decoded user information to the request for further use
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

// module.exports = checkManagerRole;


module.exports = {
    createDepartment: async (req, res) => {
        try {
            const newDepartment = await departmentModule.createDepartment(req.body);
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ message: 'Error creating department.' });
        }
    },

    updateDepartment: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            console.log("departmentId", req.params)
            const updatedDepartment = await departmentModule.updateDepartment(id, req.body);

            // Check if the department was not found
            if (!updatedDepartment) {
                return res.status(404).json({ message: 'Department not found.' });
            }

            // Log the updated department
            console.log("updatedDepartment", updatedDepartment);

            // Send the updated department in the response
            res.json(updatedDepartment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating department.' });
        }
    }],

    deleteDepartment: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            const deletedDepartment = await departmentModule.deleteDepartment(id);
            res.json(deletedDepartment);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting department.' });
        }
    }],

    getAllDepartments: async (req, res) => {
        try {
            const departments = await departmentModule.getAllDepartments();
            res.json(departments);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching departments.' });
        }
    },
};
