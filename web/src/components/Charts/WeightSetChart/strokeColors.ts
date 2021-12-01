export const strokeColors = {
  set1: "#8884d8",
  set2: "#82ca9d",
  set3: "#ca8782",
  set4: "#feff89",
  set5: "#ca82aa",
  set6: "#ff9f68",
  set7: "#f85959",
  set8: "#7c203a",
  set9: "#21e6c1",
  set10: "#278ea5",
  set11: "#1f4287",
  set12: "#071e3d",
  set13: "#107a8b",
  set14: "#2cb978",
  set15: "#83e85a",
  set16: "#3b5441",
  set17: "#39bdc8",
  set18: "#59d4e8",
  set19: "#caa5f1",
  set20: "#fac0e1",
};

export const getStrokeColor = (setNumber: number) => {
  // TODO: if the set number is larger then 20, run those colors in circle
  //@ts-ignore
  if (!strokeColors[`set${setNumber}`]) return strokeColors.set1;

  //@ts-ignore
  return strokeColors[`set${setNumber}`];
};
