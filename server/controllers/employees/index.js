const {
  findEmployeeById,
  findAllEmployees,
  findEmployeeByEmployeeNumber,
  addEmployee,
  editEmployee,
  destroyEmployee,
} = require("../../utils/employees");
const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const { isRequestDataValid } = require("../../utils/validations");

exports.getEmployeeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await findEmployeeById(id);

    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }
    handleSuccessResponse(res, employee, "Employee found successfully");
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching the employee",
      500,
      error
    );
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await findAllEmployees();

    if (!employees || employees.length === 0) {
      return handleError(next, "No employees found.", 404);
    }

    handleSuccessResponse(res, employees, "Employees fetched successfully");
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching the employees",
      500,
      error
    );
  }
};

exports.createEmployee = async (req, res, next) => {
  const { data } = req.body;

  if (
    !isRequestDataValid(req.body.data, ["name", "employee_number", "unit_id"])
  ) {
    return handleError(
      next,
      "Invalid request data. Please input [name, employee_number, unit_id]",
      400
    );
  }

  try {
    const existingEmployee = await findEmployeeByEmployeeNumber(
      data.employee_number
    );

    if (existingEmployee) {
      return handleError(
        next,
        "Employee with this employee number already exists",
        400
      );
    }

    const employee = await addEmployee(data);

    if (!employee) {
      return handleError(next, "Employee not created", 500);
    }

    handleSuccessResponse(res, employee, "Employee created successfully", 201);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while creating the employee",
      500,
      error
    );
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!isRequestDataValid(data, [])) {
    return handleError(
      next,
      "Invalid request data. Please input the fields to update",
      400
    );
  }

  try {
    const employee = await findEmployeeById(id);
    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    const updatedEmployee = await editEmployee(id, data);
    handleSuccessResponse(
      res,
      updatedEmployee,
      "Employee updated successfully"
    );
  } catch (error) {
    return handleError(next, "Error updating employee", 500, error);
  }
};

exports.employeeActivation = async (req, res, next) => {
  const { id } = req.params;

  const { data } = req.body;

  if (data.state === undefined) {
    return handleError(next, "State field is required.", 400);
  }

  try {
    const employee = await findEmployeeById(id);
    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    const updatedEmployee = await editEmployee(id, {
      is_active: data.state,
    });
    handleSuccessResponse(
      res,
      updatedEmployee,
      `Employee ${data.state ? "activated" : "deactivated"} successfully`
    );
  } catch (error) {
    return handleError(next, "Error updating employee state", 500, error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await destroyEmployee(id);

    if (!deletedRows) {
      return handleError(next, "Employee not found", 404);
    }

    handleSuccessResponse(res, null, "Employee deleted successfully", 204);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while deleting the employee",
      500,
      error
    );
  }
};
