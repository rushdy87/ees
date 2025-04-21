function hasRootPermission(user) {
  if (!user || !user.role) return false;

  const { role } = user;

  return role === "root";
}
function hasManagerPermission(user) {
  if (!user || !user.role) return false;

  const { role } = user;

  return role === "manager";
}

function hasPermissionToRead(user, unit = "", shift = "") {
  if (!user || !user.role) return false;

  const { role } = user;

  if (["root", "manager"].includes(role)) return true;

  const sameUnit = user.unit === unit;
  const sameShift = user.shift === shift;

  if (role === "admin" && sameUnit) return true;

  if (role === "engineer" && sameUnit && sameShift) return true;

  return false;
}

function hasPermissionToModify(user) {
  if (!user || !user.role) return false;
  return ["root", "manager"].includes(user.role);
}

function hasPermissionToModifyEvaluation(user, unit = "", shift = "") {
  if (!user || !user.role) return false;

  const { role } = user;

  if (["root", "manager"].includes(role)) return true;

  const sameUnit = user.unit === unit;
  const sameShift = user.shift === shift;

  if (role === "admin" && sameUnit) return true;

  if (role === "engineer" && sameUnit && sameShift) return true;

  return false;
}

module.exports = {
  hasRootPermission,
  hasManagerPermission,
  hasPermissionToRead,
  hasPermissionToModify,
  hasPermissionToModifyEvaluation,
};
