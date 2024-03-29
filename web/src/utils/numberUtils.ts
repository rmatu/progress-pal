export const countDecimals = (value: number) => {
  if (Math.floor(value) !== value)
    return value.toString().split(".")[1].length || 0;
  return 0;
};

export const gramsToKilograms = (grams: number) => {
  return grams / 1000;
};
