// modules/employeeModule.js
const Employee = require('../models/employee');
const userModel = require('../models/user');

module.exports = {
  createEmployee: async (employeeData) => {
    try {
      const newEmployee = await Employee.create(employeeData);
      return newEmployee;
    } catch (error) {
      throw error;
    }
  },

  updateEmployee: async (employeeId, newData, requestingUserRole) => {
    try {
      // Only allow managers to update employees
      if (requestingUserRole !== 'manager') {
        throw new Error('Only managers can update employees.');
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, newData, { new: true });
      return updatedEmployee;
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (employeeId, requestingUserRole) => {
    try {
      // Only allow managers to delete employees
      if (requestingUserRole !== 'manager') {
        throw new Error('Only managers can delete employees.');
      }

      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
      return deletedEmployee;
    } catch (error) {
      throw error;
    }
  },

  getAllEmployees: async (page, limit, sortField, sortOrder, location) => {
    try {
      let sortQuery = {};
      if (sortField) {
        sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1;
      }

      const query = location ? { location } : {};

      const employees = await Employee.find(query)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('department');

      const totalLength = await Employee.countDocuments(query);

      return {
        employees,
        totalLength,
      };
    } catch (error) {
      throw error;
    }
  },
  getEmployeeDetails: async (employeeId) => {
    try {
      const employee = await userModel.findById(employeeId);
      return employee;
    } catch (error) {
      throw error;
    }
  },

  filterEmployeesByLocation: async (location) => {
    try {
      const employees = await Employee.find({ location }).populate('department');
      return employees;
    } catch (error) {
      throw error;
    }
  },

  filterEmployeesByName: async (order) => {
    try {
      const employees = await Employee.find().sort({ name: order });
      return employees;
    } catch (error) {
      throw error;
    }
  },
  assignDepartmentToEmployee: async (employeeId, departmentId, requestingUserRole) => {
    try {
      if (requestingUserRole !== 'manager') {
        throw new Error('Only managers can assign departments.');
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { department: departmentId },
        { new: true }
      )

      return updatedEmployee;
    } catch (error) {
      throw error;
    }
  },
};
