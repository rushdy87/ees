const router = require("express").Router();

const EmployeeControllers = require("../../controllers/employees");

// /api/v1/employees

// GET all employees
router.get("/", EmployeeControllers.getAllEmployees);

// GET an employee by id
router.get("/:id", EmployeeControllers.getEmployeeById);

// POST a new employee
router.post("/", EmployeeControllers.createEmployee);

// PATCH an employee
router.patch("/:id", EmployeeControllers.updateEmployee);

router.patch("/:id/activate", EmployeeControllers.employeeActivation);

// DELETE an employee
router.delete("/:id", EmployeeControllers.deleteEmployee);

module.exports = router;
