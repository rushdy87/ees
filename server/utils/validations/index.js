const { units } = require("../../constants/units");

const isRequestDataValid = (data, fields) => {
  if (!data) return false;
  return fields.every((field) => data[field]);
};

const isUnitHaveAValidSymbol = (symbol) => {
  if (!symbol) return false;
  const unit = units.find((unit) => unit.symbol === symbol);
  return unit ? true : false;
};

module.exports = {
  isRequestDataValid,
  isUnitHaveAValidSymbol,
};
