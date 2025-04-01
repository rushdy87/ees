const bcrypt = require("bcrypt");

// Hash Password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Verify Password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
