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
  const subAmount = Math.ceil(amountToSubstract / amount);

  for (let i = amount; i > 0; i--) {
    colorArr.push(
      `rgb(${startColorR}, ${
        startColorG - (amountToSubstract - subAmount * i)
      }, ${startColorB - (amountToSubstract - subAmount * i)})`,
    );
  }

  return colorArr;
};
