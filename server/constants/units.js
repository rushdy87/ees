const units = [
  { name: "Unit 45", symbol: "u45" },
  { name: "Unit 52", symbol: "u52" },
  { name: "Unit 53", symbol: "u53" },
  { name: "Unit 54", symbol: "u54" },
  { name: "Unit 61", symbol: "u61" },
  { name: "Unit 90", symbol: "u90" },
  { name: "Heavy Fuel Oil", symbol: "hfo" },
  { name: "Administration", symbol: "adm" },
];

const defaultMonthlyEvaluationRule = {
  range_90_93: 25,
  range_80_89: 35,
  range_70_79: 40,
};

module.exports = { units, defaultMonthlyEvaluationRule };
