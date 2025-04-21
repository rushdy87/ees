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

function hasPermissionToCreate(user) {
  if (!user || !user.role) return false;

  const { role } = user;

  if (["root", "manager"].includes(role)) return true;

  return false;
}
function hasPermissionToUpdate(user) {
  if (!user || !user.role) return false;

  const { role } = user;

  if (["root", "manager"].includes(role)) return true;

  return false;
}

module.exports = {
  hasPermissionToRead,
  hasPermissionToCreate,
  hasPermissionToUpdate,
};
