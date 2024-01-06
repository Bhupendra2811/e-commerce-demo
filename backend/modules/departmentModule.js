// departmentModule.js
const Department = require('../models/department');
const Employee = require('../models/employee');

module.exports = {
  createDepartment: async (departmentData) => {
    try {
      const newDepartment = await Department.create(departmentData);
      return newDepartment;
    } catch (error) {
      throw error;
    }
  },

  updateDepartment: async (departmentId, newData) => {
    try {
      const updatedDepartment = await Department.findByIdAndUpdate(departmentId, newData, { new: true });
      return updatedDepartment;
    } catch (error) {
      throw error;
    }
  },

  deleteDepartment: async (departmentId) => {
    try {
      const deletedDepartment = await Department.findByIdAndDelete(departmentId);
      return deletedDepartment;
    } catch (error) {
      throw error;
    }
  },

  getAllDepartments: async () => {
    try {
      const departments = await Department.find();
      return departments;
    } catch (error) {
      throw error;
    }
  },
 
};
