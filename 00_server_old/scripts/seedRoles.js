const Role = require("../models/roles");
const sequelize = require("../config/database");
const { rolesType, rolePermissions } = require("../constants/roles");

(async () => {
  try {
    console.log("Syncing database...");
    await sequelize.sync({ alter: true });
    // await sequelize.sync(); // <-- This line ensures the table exists

    for (const roleType of rolesType) {
      const [role, created] = await Role.findOrCreate({
        where: { type: roleType },
        defaults: {
          permissions: rolePermissions[roleType],
        },
      });

      if (created) {
        console.log(`✅ Created role "${roleType}"`);
      } else {
        console.log(`ℹ️ Role "${roleType}" already exists`);
      }
    }

    console.log("Seeding roles completed ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding roles:", error);
    process.exit(1);
  }
})();
