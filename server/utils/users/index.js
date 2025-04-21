const User = require("../../models/users");

const Employee = require("../../models/employees"); // ✅ Import Employee model
const Unit = require("../../models/units");

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
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "username", "role"],
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["name", "shift", "is_active"],
          include: [
            {
              model: Unit,
              as: "unit",
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      name: user.employee.name,
      unit: user.employee.unit.id,
      shift: user.employee.shift,
      is_active: user.employee.is_active,
      role: user.role,
    };
  } catch (error) {
    console.error("Error in findUserById:", error);
    throw error;
  }
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

const addUser = async ({ username, password, employee_id, role }) => {
  if (!username || !password || !employee_id || !role) {
    return null;
  }

  return await User.create({
    username,
    password,
    employee_id,
    role,
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
