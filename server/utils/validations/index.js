const { units } = require("../../constants/units");

const isRequestDataValid = (data, fields) => {
  if (!data) return false;
  return fields.every((field) => data[field]);
};

const isUnitHaveAValidNameAndSymbol = (name, symbol) => {
  if (!name || !symbol) return false;
  const unit = units.find(
    (unit) => unit.name === name && unit.symbol === symbol
  );
  return unit ? true : false;
};

module.exports = {
  isRequestDataValid,
  isUnitHaveAValidNameAndSymbol,
};
