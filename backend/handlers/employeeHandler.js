// handlers/employeeHandler.js
const employeeModule = require('../modules/employeeModule');
const authHandler = require('../handlers/authHandler')
const jwt = require('jsonwebtoken');
function paginate(array, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return array.slice(startIndex, endIndex);
}
// Middleware to check if the user is a manager
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
            let { page, limit, sortField, sortOrder, location } = req.query;

            const result = await employeeModule.getAllEmployees(
                page,
                limit,
                sortField,
                sortOrder,
                location
            );

            res.json({
                success: true,
                message: 'Employees fetched successfully',
                data: {
                    employees: result.employees,
                    totalLength: result.totalLength,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employees.' });
        }
    },

    getEmployeeDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await employeeModule.getEmployeeDetails(id);

            res.json({
                success: true,
                message: "Employees fetched successfully",
                data: employee
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employee details.' });
        }
    },

    filterEmployeesByLocation: async (req, res) => {
        try {
            const { location, page, limit } = req.query;
            const employees = await employeeModule.filterEmployeesByLocation(location);
            let data = paginate(employees, page, limit);
            const totalLength = employees.length;
            res.json({
                success: true,
                message: "Employees fetched successfully",
                data: {
                    employees: data,
                    totalLength: totalLength,
                },
            });
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
            const updatedEmployee = await employeeModule.assignDepartmentToEmployee(
                id,
                departmentId,
                req.user
            );
            
            res.json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error assigning department to employee.' });
        }
    }],
};
