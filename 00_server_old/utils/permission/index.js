const { findUnitBySymbol } = require("../units");

function hasRootPermission(user) {
  if (!user || !user.roleType) return false;

  return user.roleType === "Root";
}

function hasManagerPermission(user) {
  if (!user || !user.roleType) return false;

  return user.roleType === "Manager";
}

function hasAdminPermission(user, unitSymbol = "") {
  if (!user || !user.roleType) return false;

  const { roleType, UnitSymbol } = user;

  if (roleType === "Admin" && UnitSymbol === unitSymbol) return true;

  return false;
}

function hasEngineerPermission(user, unitSymbol = "", shift = "") {
  if (!user || !user.roleType) return false;

  const { roleType, UnitSymbol, shift: userShift } = user;

  if (
    roleType === "Engineer" &&
    UnitSymbol === unitSymbol &&
    userShift === shift
  )
    return true;

  return false;
}

function hasPermission(user, unitSymbol = "", shift = "") {
  if (!user || !user.roleType) return false;

  const { roleType } = user;

  if (["Root", "Manager"].includes(roleType)) return true;

  const sameUnit = user.UnitSymbol === unitSymbol;
  const sameShift = user.shift === shift;

  if (roleType === "Admin" && sameUnit) return true;

  if (roleType === "Engineer" && sameUnit && sameShift) return true;

  return false;
}

async function whatUserCanDo(user) {
  console.log(user);

  const condition = { is_active: true };
  const { roleType } = user;

  if (["Root", "Manager"].includes(roleType)) return condition;

  if (roleType === "Admin") {
    const unit = await findUnitBySymbol(user.UnitSymbol);
    condition.unitId = unit.id;
  }
  if (roleType === "Engineer") {
    const unit = await findUnitBySymbol(user.UnitSymbol);
    condition.unit_id = unit.id;
    condition.shift = user.shift;
  }
  return condition;
}

module.exports = {
  hasRootPermission,
  hasManagerPermission,
  hasAdminPermission,
  hasEngineerPermission,
  hasPermission,
  whatUserCanDo,
};
