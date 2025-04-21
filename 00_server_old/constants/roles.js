const rolesType = ["Root", "Manager", "Admin", "Engineer"];

const rolePermissions = {
  Root: {
    can_manage_users: true,
    can_manage_roles: true,
    can_manage_evaluations: true,
    can_access_all_units: true,
    can_access_all_shifts: true,
  },
  Manager: {
    can_manage_users: false,
    can_manage_roles: false,
    can_manage_evaluations: true,
    can_access_all_units: true,
    can_access_all_shifts: true,
  },
  Admin: {
    can_manage_users: false,
    can_manage_roles: false,
    can_manage_evaluations: true,
    can_access_all_units: false,
    can_access_all_shifts: true, // Admin can see all shifts in his unit
  },
  Engineer: {
    can_manage_users: false,
    can_manage_roles: false,
    can_manage_evaluations: true,
    can_access_all_units: false,
    can_access_all_shifts: false, // Engineer can see only his shift
  },
};

module.exports = { rolesType, rolePermissions };
