// authHandler.js
const roleModel = require("../models/role");
const userModel = require("../models/user");
const { hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 *  role list API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const rolesList = async (req, res) => {
  return roleModel.find();
}
const getLoginRole = async (id) => {
  return roleModel.findById(id);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const userExists = async (email) => {
  return userModel.findOne({ email: email });
}
/**
 *  singup API
 * @param {*} req 
 * @param {*} res 
 */
const signup = async (reqBody) => {

  return userModel.create(reqBody);
}

const createToken = async (reqBody) => {
  return jwt.sign(reqBody, "testKey");
}
const getUserLogedInRole = async (userId) => {

  const user = await userModel.findById(userId);
  console.log("ssssss", user)
  if (!user) {
    throw new Error('User not found');
  }

  const roleId = user.roleId;
  console.log("ssssss", roleId)
  const role = await roleModel.findById(roleId);
  console.log("ssssss", role)
  if (!role) {
    throw new Error('Role not found');
  }

  return role.name;

};
module.exports = {
  rolesList,
  signup,
  userExists,
  createToken,
  getLoginRole,
  getUserLogedInRole
};
// Implement routes for user signup and login
