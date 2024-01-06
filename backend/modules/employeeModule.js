// modules/employeeModule.js
const Employee = require('../models/employee');

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

  getAllEmployees: async () => {
    try {
      const employees = await Employee.find().populate('department');
      return employees;
    } catch (error) {
      throw error;
    }
  },

  getEmployeeDetails: async (employeeId) => {
    try {
      const employee = await Employee.findById(employeeId);
      return employee;
    } catch (error) {
      throw error;
    }
  },

  filterEmployeesByLocation: async (location) => {
    try {
      const employees = await Employee.find({ location });
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
    console.log("modeleee",employeeId, departmentId, requestingUserRole)
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
