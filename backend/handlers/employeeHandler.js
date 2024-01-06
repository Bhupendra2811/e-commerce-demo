// handlers/employeeHandler.js
const employeeModule = require('../modules/employeeModule');
const authHandler = require('../handlers/authHandler')
const jwt = require('jsonwebtoken');

// Middleware to check if the user is a manager
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
        req.user = userRole;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

module.exports = {
    createEmployee: [checkManagerRole, async (req, res) => {
        try {
            const newEmployee = await employeeModule.createEmployee(req.body);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error creating employee.' });
        }
    }],

    updateEmployee: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            console.log("requestusermeployer", req)
            const updatedEmployee = await employeeModule.updateEmployee(id, req.body, req.user);
            res.json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error updating employee.' });
        }
    }],

    deleteEmployee: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            const deletedEmployee = await employeeModule.deleteEmployee(id, req.user);
            res.json(deletedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting employee.' });
        }
    }],

    getAllEmployees: async (req, res) => {
        try {
            const employees = await employeeModule.getAllEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employees.' });
        }
    },

    getEmployeeDetails: async (req, res) => {
        try {
            const { employeeId } = req.params;
            const employee = await employeeModule.getEmployeeDetails(employeeId);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employee details.' });
        }
    },

    filterEmployeesByLocation: async (req, res) => {
        try {
            const { location } = req.query;
            const employees = await employeeModule.filterEmployeesByLocation(location);
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering employees by location.' });
        }
    },

    filterEmployeesByName: async (req, res) => {
        try {
            const { order } = req.query;
            const employees = await employeeModule.filterEmployeesByName(order);
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering employees by name.' });
        }
    },
    assignDepartmentToEmployee: [checkManagerRole, async (req, res) => {
        try {
            const { id } = req.params;
            const { departmentId } = req.body;
            console.log("assignment", id, departmentId)
            const updatedEmployee = await employeeModule.assignDepartmentToEmployee(
                id,
                departmentId,
                req.user
            );
            console.log("updatedEmployee", updatedEmployee)
            res.json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error assigning department to employee.' });
        }
    }],
};
