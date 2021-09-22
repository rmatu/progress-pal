type GenericObject = { [key: string]: any };

export const checkIfObjectHasValue = (
  searchValue: any,
  searchObject: GenericObject,
) => {
  for (let key in searchObject) {
    if (searchObject[key] === searchValue) return true;
  }
  return false;
};
