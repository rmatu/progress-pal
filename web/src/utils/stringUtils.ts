export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const lowerCaseFirstLetter = (text: string) => {
  return text.charAt(0).toLowerCase() + text.slice(1);
};
