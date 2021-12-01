export const strokeColors = {
  set1: "#8884d8",
  set2: "#82ca9d",
  set3: "#ca8782",
  set4: "#ca82aa",
  set5: "#ca82aa",
  set6: "#ca82aa",
  set7: "#ca82aa",
  set8: "#ca82aa",
  set9: "#ca82aa",
  set10: "#ca82aa",
  set11: "#ca82aa",
  set12: "#ca82aa",
  set13: "#ca82aa",
  set14: "#ca82aa",
  set15: "#ca82aa",
  set16: "#ca82aa",
  set17: "#ca82aa",
  set18: "#ca82aa",
  set19: "#ca82aa",
  set20: "#ca82aa",
};

export const getStrokeColor = (setNumber: number) => {
  // TODO: if the set number is larger then 20, run those colors in circle
  //@ts-ignore
  if (!strokeColors[`set${setNumber}`]) return strokeColors.set1;

  //@ts-ignore
  return strokeColors[`set${setNumber}`];
};
