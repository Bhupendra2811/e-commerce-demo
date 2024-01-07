// router.js
const express = require('express')
const authHandler = require('./handlers/authHandler');
const { hash, hashSync, compareSync } = require('bcryptjs');
const validator = require("express-joi-validation").createValidator({});
const joi = require('joi');
const departmentHandler = require('./handlers/departmentHandler');
const employeeHandler = require('./handlers/employeeHandler');
// const departmentHandler = require('./handlers/departmentHandler')
// const employeeHandler = require('./handlers/employeeHandler')


const router = express.Router()

/** role get API */
router.get('/get-all-roles', async (req, res) => {

  const rolesList = await authHandler.rolesList();
  return res.status(200).send({
    success: true,
    message: "Roles List",
    role: rolesList
  });
});

// Define your routes here by using the handlers
router.post('/signup', async (req, res) => {

  const querySchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    roleId: joi.string().required(),
  });

  validator.query(querySchema)


  const { name, email, password, roleId } = req.body;
  const userExists = await authHandler.userExists(email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  req.body.password = await hashSync(password, 10);
  const createUser = await authHandler.signup(req.body);
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    createUser,
  });
})
router.post('/login', async (req, res) => {

  const querySchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  validator.query(querySchema);
  const { email, password } = req.body;
  const userExists = await authHandler.userExists(email);
  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }
  if (!await compareSync(password, userExists.password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const role = await authHandler.getLoginRole(userExists.roleId);

  const token = await authHandler.createToken({ _id: userExists._id });

  return res.status(200).json({
    success: true,
    message: "User login successfully",
    data: {
      userExists: {
        ...userExists.toObject(),
        roleName: role ? role.name : null, // Include role name in the response
      }, token
    },
  });
})

router.post('/create-department', departmentHandler.createDepartment)
router.put('/update-department/:id', departmentHandler.updateDepartment)
router.delete('/delete-department/:id', departmentHandler.deleteDepartment)
router.get('/get-all-departments', departmentHandler.getAllDepartments)

router.post('/create-employee', employeeHandler.createEmployee)
router.put('/update-employee/:id', employeeHandler.updateEmployee)
router.delete('/delete-employee/:id', employeeHandler.deleteEmployee)
router.get('/get-all-employees', employeeHandler.getAllEmployees)
router.get('/get-employee-details/:id', employeeHandler.getEmployeeDetails)
router.put('/employees/assign-department/:id', employeeHandler.assignDepartmentToEmployee);

module.exports = router
