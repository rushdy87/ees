const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/index");
// /api/v1/auth
router.post("/login", AuthControllers.login);

module.exports = router;
