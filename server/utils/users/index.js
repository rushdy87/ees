const User = require("../../models/users");

const Employee = require("../../models/employees"); // ✅ Import Employee model

const findAllUsers = async () => {
  return await User.findAll({
    include: [
      {
        model: Employee, // ✅ Use Employee directly
        as: "employee",
        attributes: ["id", "name"],
      },
    ],
  });
};

const findUserById = async (id) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Employee, // ✅ Use Employee directly
        as: "employee",
        attributes: ["id", "name"],
      },
    ],
  });
};

const findUser = async (data) => {
  return await User.findOne({
    where: data,
    include: [
      {
        model: Employee, // ✅ Use Employee directly
        as: "employee",
        attributes: ["id", "name"],
      },
    ],
  });
};

const addUser = async ({ username, password, employee_id, role_id }) => {
  if (!username || !password || !employee_id || !role_id) {
    return null;
  }

  return await User.create({
    username,
    password,
    employee_id,
    role_id,
  });
};

const editUser = async (id, data) => {
  const [affectedRows] = await User.update(data, {
    where: { id },
  });

  if (affectedRows > 0) {
    return await findUserById(id); // ✅ Fetch the updated user
  }
  return null;
};

module.exports = {
  findAllUsers,
  findUserById,
  findUser,
  addUser,
  editUser,
};
