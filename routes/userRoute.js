const express = require("express");
const router = express.Router();

const User = require("../model/User");

const {
  getUsers,
  addUser,
  updateUser,
  countApiCall,
} = require("../controllers/userController");

// Middleware for ID uniqueness validation
const validateIdUniqueness = async (req, res, next) => {
  const existingUser = await User.findOne({ id: req.body.id });
  if (existingUser) {
    return res.status(400).json({ error: "ID must be unique" });
  }
  next();
};

// Middleware for Age numeric and range validation
const validateAge = (req, res, next) => {
  const age = req.body.age;
  if (isNaN(age) || age < 1 || age > 100) {
    return res
      .status(400)
      .json({ error: "Age must be numeric and within the range of 1 to 100" });
  }
  next();
};

// Middleware for Full Name validation
const validatename = (req, res, next) => {
  const name = req.body.name;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: " Name is required" });
  }
  next();
};

router.get("/", getUsers);
router.post("/", validateIdUniqueness, validatename, validateAge, addUser);
router.put("/:id", validatename, validateAge, updateUser);
router.get("/count", countApiCall);

module.exports = router;
