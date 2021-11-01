import { IExerciseData } from "react-body-highlighter";

// anyBodyCategory: "Any Body Category",
// abdominals: "Abdominals",       // miesnie brzucha
// abductors: "Abductors",         // mięsień odwodzący
// biceps: "Biceps",               // biceps
// calves: "Calves",               // calves
// chest: "Chest",                 // klatka piersiowa
// forearms: "Forearms",           // przedramiona
// glutes: "Glutes",               // pośladki
// hamstrings: "Hamstrings",       // uda
// lats: "Lats",                   // motyle
// lowerBack: "Lower back",        // dolna część pleców
// middleBack: "Middle back",      // środek pleców
// neck: "Neck",                   // szyja
// quadriceps: "Quadriceps",       // mięsień czworogłowy
// shoulders: "Shoulders",         // barki
// traps: "Traps",                 // górna część pleców, pod szyją
// triceps: "Triceps",             // triceps

export const convertMusclesToSVGNames = (muscleNames: string[]) => {
  const newArr = [];

  if (muscleNames.includes("abdominals")) newArr.push("abs");
  if (muscleNames.includes("adductors")) newArr.push("adductor");
  if (muscleNames.includes("calves")) newArr.push("calves");
  if (muscleNames.includes("chest")) newArr.push("chest");
  if (muscleNames.includes("biceps")) newArr.push("biceps");
  if (muscleNames.includes("forearms")) newArr.push("forearm");
  if (muscleNames.includes("hamstrings")) newArr.push("hamstring");
  if (muscleNames.includes("lats")) newArr.push("upper-back");
  if (muscleNames.includes("lower back")) newArr.push("lower-back");
  if (muscleNames.includes(`"lower back"`)) newArr.push("lower-back");
  if (muscleNames.includes("middleBack")) newArr.push("upper-back");
  if (muscleNames.includes(`"middle back"`)) newArr.push("upper-back");
  if (muscleNames.includes("neck")) newArr.push("trapezius");
  if (muscleNames.includes("quadriceps")) newArr.push("quadriceps");
  if (muscleNames.includes("shoulders"))
    newArr.push("front-deltoids", "back-deltoids");
  if (muscleNames.includes("traps")) newArr.push("trapezius");
  if (muscleNames.includes("triceps")) newArr.push("triceps");
  if (muscleNames.includes("glutes")) newArr.push("gluteal");

  return newArr;
};

export const sanitazeMuscleNameFromDB = (muscleNames: string[]) => {
  if (muscleNames.includes(`"middle back"`)) return "Middle Back";
  if (muscleNames.includes(`"lower back"`)) return "Lower Back";

  return muscleNames[0];
};

export const unsanitazeMuscleNameFromDB = (muscleNames: string[]) => {
  if (muscleNames.includes("Middle Back")) return `"middle back"`;
  if (muscleNames.includes("Lower Back")) return `"lower back"`;

  return muscleNames[0];
};

export const convertMuscleNames = (muscleName: string) => {
  switch (muscleName) {
    case "abdominals":
      return ["abs"];
    case "adductors":
      return ["adductor"];
    case "biceps":
      return ["biceps"];
    case "calves":
      return ["calves"];
    case "chest":
      return ["chest"];
    case "forearms":
      return ["forearm"];
    case "glutes":
      return ["gluteal"];
    case "hamstrings":
      return ["hamstring"];
    case "lats":
      return ["upper-back"];
    case "lowerBack":
      return ["lower-back"];
    case "middleBack":
      return ["upper-back"];
    case "neck":
      return ["trapezius"];
    case "quadriceps":
      return ["quadriceps"];
    case "shoulders":
      return ["front-deltoids", "back-deltoids"];
    case "traps":
      return ["trapezius"];
    case "triceps":
      return ["triceps"];
    default:
      return [muscleName];
  }
};

export const convertMuscleDBToNPMPackage = (
  muscleNames: string[],
): IExerciseData[] => {
  const newArr: IExerciseData[] | [] = [];

  muscleNames.forEach(muscleName =>
    // @ts-ignore
    newArr.push(...convertMuscleNames(muscleName)),
  );

  return [{ muscles: newArr, name: "" }] as IExerciseData[];
};
