import { GLOBAL_FONT_SIZE } from "../theme/global";

export const convertPxToRem = (...args: (string | number)[]) =>
  args.reduce((acc, curr) => {
    if (curr === "auto") {
      return (acc += "auto ");
    }

    if (!curr) {
      return (acc += "0 ");
    }

    //@ts-ignore
    return (acc += `${curr / GLOBAL_FONT_SIZE}rem `);
  }, "");

export const populateColorsForMuscleHeatmap = (
  amount: number,
  startColorR: number,
  startColorG: number,
  startColorB: number,
  endColorG: number,
) => {
  const colorArr = [];
  const amountToSubstract = startColorG - endColorG;

  for (let i = amount; i > 0; i--) {
    colorArr.push(
      `rgb(${startColorR}, ${
        startColorG - Math.ceil(amountToSubstract / (i + 1))
      }, ${startColorB - Math.ceil(amountToSubstract / (i + 1))})`,
    );
  }

  return colorArr;
};
