export const months = {
  1: "كانون الثاني",
  2: "شباط",
  3: "آذار",
  4: "نيسان",
  5: "أيار",
  6: "حزيران",
  7: "تموز",
  8: "آب",
  9: "أيلول",
  10: "تشرين الأول",
  11: "تشرين الثاني",
  12: "كانون الأول",
};

export const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1;
};

export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
