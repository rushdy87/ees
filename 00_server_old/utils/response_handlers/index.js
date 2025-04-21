class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add "message" property
    this.code = errorCode; //Add "code" property
  }
}

const handleError = (next, message, statusCode = 500, error) => {
  console.error("Error:", error || message);

  return next(new HttpError(message, statusCode));
};

const handleSuccessResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    data: Array.isArray(data) ? data : [data], // Ensure array consistency
    message,
  });
};

module.exports = { handleSuccessResponse, handleError };
