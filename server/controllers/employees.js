const { handleError, handleSuccessResponse } = require("../utils");
const { validateInput } = require("../utils/validations");
const {
  findAllEmployees,
  findEmployeeById,
  createEmployee,
  isEmployeeNumberExist,
} = require("../utils/employees");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await findAllEmployees();
    if (!employees || employees.length === 0) {
      return handleError(next, "No employees found", 404);
    }

    handleSuccessResponse(
      res,
      employees,
      "Employees fetched successfully",
      200
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching the employees",
      500,
      error
    );
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await findEmployeeById(id);

    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    handleSuccessResponse(res, employee, "Employee fetched successfully", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching the employee",
      500,
      error
    );
  }
};

exports.createEmployee = async (req, res, next) => {
  if (!req.body.data) {
    return handleError(next, "Missing required fields", 400);
  }

  const { data } = req.body;

  if (!validateInput(data, ["name", "employee_number", "unit_id"], next)) {
    return handleError(next, "Missing required fields", 400);
  }

  try {
    if (await isEmployeeNumberExist(data.employee_number)) {
      return handleError(
        next,
        `Employee number ${data.employee_number} already exists`,
        409
      );
    }

    const employee = await createEmployee(data);

    if (!employee) {
      return handleError(next, "An error occurred while creating the employee");
    }

    handleSuccessResponse(res, employee, "Employee created successfully", 201);
  } catch (error) {
    handleError(
      next,
      "An error occurred while creating the employee",
      500,
      error
    );
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body.data) {
    return handleError(next, "Missing required fields", 400);
  }
  const { data } = req.body;

  try {
    const employee = await findEmployeeById(id);

    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    // Only check for duplicate employee_number if it's changing
    if (
      data.employee_number &&
      data.employee_number !== employee.employee_number
    ) {
      if (await isEmployeeNumberExist(data.employee_number)) {
        return handleError(
          next,
          `Employee number ${data.employee_number} already exists`,
          409
        );
      }
    }

    const updatedEmployee = await employee.update(data);

    handleSuccessResponse(
      res,
      updatedEmployee,
      "Employee updated successfully",
      200
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while updating the employee",
      500,
      error
    );
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await findEmployeeById(id);

    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    await employee.destroy();

    handleSuccessResponse(res, null, "Employee deleted successfully", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while deleting the employee",
      500,
      error
    );
  }
};
