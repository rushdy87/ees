const User = require("../../models/users");

const Employee = require("../../models/employees"); // ✅ Import Employee model
const Unit = require("../../models/units");
const Role = require("../../models/roles");

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
      attributes: ["id", "username"],
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["name", "shift", "is_active"],
          include: [
            {
              model: Unit,
              as: "unit",
              attributes: ["symbol"],
            },
          ],
        },
        {
          model: Role,
          as: "role",
          attributes: ["type"],
        },
      ],
    });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      name: user.employee.name,
      UnitSymbol: user.employee.unit.symbol,
      shift: user.employee.shift,
      is_active: user.employee.is_active,
      roleType: user.role.type,
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
