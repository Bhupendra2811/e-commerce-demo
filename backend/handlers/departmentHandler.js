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
        const decoded = jwt.verify(token, 'testKey');
        const { _id } = decoded
        const userRole = await authHandler.getUserLogedInRole(_id);
        if (userRole !== 'manager') {
            return res.status(403).json({ message: 'Only managers can perform this action.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

/**
 *  pagination function
 * @param {*} array 
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
function paginate(array, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return array.slice(startIndex, endIndex);
}
// module.exports = checkManagerRole;


module.exports = {
    createDepartment: async (req, res) => {
        try {
            const newDepartment = await departmentModule.createDepartment(req.body);
            res.status(201).json({ success: true, message: "create successfully", data: newDepartment });
        } catch (error) {
            res.status(500).json({ message: 'Error creating department.' });
        }
    },

    updateDepartment: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            const updatedDepartment = await departmentModule.updateDepartment(id, req.body);
            if (!updatedDepartment) {
                return res.status(404).json({ message: 'Department not found.' });
            }

            res.json({
                success: true,
                message: "update successfully",
                data: updatedDepartment,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating department.' });
        }
    }],

    deleteDepartment: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            const deletedDepartment = await departmentModule.deleteDepartment(id);
            res.json({
                success: true,
                message: "delete successfully",
                data: deletedDepartment,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting department.' });
        }
    }],

    getAllDepartments: async (req, res) => {
        try {
            let { page, limit } = req.query
            const departments = await departmentModule.getAllDepartments();
            const totalLength = departments.length;

            let data = paginate(departments, page, limit);
            res.json({
                success: true,
                message: "Fetched department successfully",
                data: {
                    departments: data,
                    totalLength: totalLength,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching departments.' });
        }
    },
};
