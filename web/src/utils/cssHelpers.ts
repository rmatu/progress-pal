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
