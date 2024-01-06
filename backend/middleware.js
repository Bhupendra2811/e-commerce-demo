import { validationResult } from "express-validator";


export const checkManagerRole = (req, res, next) => {
  const userRole = req.user.roleName; // Assuming the user's role is stored in req.user
  if (userRole !== 'manager') {
    return res.status(403).json({ message: 'Only managers can perform this action.' });
  }
  next();
};

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next()
  }
}