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

const convertMuscleNames = (muscleName: string) => {
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
