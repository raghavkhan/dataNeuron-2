const User = require("../model/User");
const { addCount, updateCount } = require("../app");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addUser = async (req, res) => {
  const userData = req.body;
  console.log(userData, "USERDATA");
  try {
    const users = await User.create(userData);
    console.log(users, "--SECOND---");
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      userData,
      { new: true },
      { runValidators: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const countApiCall = async (req, res) => {
  res.json({ addCounter: addCount, updateCounter: updateCount });
};

module.exports = {
  addUser,
  getUsers,
  updateUser,
  countApiCall,
};
