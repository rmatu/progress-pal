import moment from "moment";
import { IExerciseData } from "react-body-highlighter";
import { GetDataForMuscleHeatmapQuery, Workout } from "../generated/graphql";

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
  if (muscleNames.includes("middle back")) newArr.push("upper-back");
  if (muscleNames.includes("neck")) newArr.push("trapezius");
  if (muscleNames.includes("quadriceps")) newArr.push("quadriceps");
  if (muscleNames.includes("shoulders"))
    newArr.push("front-deltoids", "back-deltoids");
  if (muscleNames.includes("traps")) newArr.push("trapezius");
  if (muscleNames.includes("triceps")) newArr.push("triceps");
  if (muscleNames.includes("glutes")) newArr.push("gluteal");

  return newArr;
};
// ('abdominals','hamstrings','adductors','quadriceps','biceps','shoulders','chest','middle back','calves','glutes','lower back',
// 'lats','triceps','traps','forearms','neck','abductors');
export const convertSVGNamesToDBNames = (muscleArr: string[]) => {
  const newArr = muscleArr.map(muscleName => {
    if (muscleName === "abs") return "abdominals";
    if (muscleName === "hamstring") return "hamstrings";
    if (muscleName === "adductor") return "adductors";
    if (muscleName === "front-deltoids" || muscleName === "back-deltoids")
      return "shoulders";
    if (muscleName === "upper-back") return "middle back";
    if (muscleName === "gluteal") return "glutes";
    if (muscleName === "lower-back") return "lower back";
    if (muscleName === "upper-back") return "lats";
    if (muscleName === "trapezius") return "traps";
    if (muscleName === "forearm") return "forearms";
    if (muscleName === "trapezius") return "neck";
    if (muscleName === "obliques") return "abdominals";

    return muscleName;
  });

  return newArr;
};

export const convertMuscleNamesForExercisePage = (
  muscleArr: string[],
  type: "primaryMuscle" | "secondaryMuscle",
) => {
  const newArr: { name: string; muscles?: string[]; type: string }[] = [];

  muscleArr.forEach(muscleName => {
    if (type === "primaryMuscle") {
      newArr.push({
        name: muscleName,
        type,
        muscles: convertMusclesToSVGNames([muscleName]),
      });
    } else {
      newArr.push({
        name: muscleName,
        type,
        muscles: [
          ...convertMusclesToSVGNames([muscleName]),
          ...convertMusclesToSVGNames([muscleName]),
        ],
      });
    }
  });

  return newArr;
};

export const sanitazeMuscleNameFromDB = (muscleNames: string[]) => {
  if (muscleNames.includes(`"middle back"`)) return "Middle Back";
  if (muscleNames.includes(`"lower back"`)) return "Lower Back";

  return muscleNames[0];
};

export const unsanitazeMuscleNameFromDB = (muscleNames: string[]) => {
  if (muscleNames.includes("Middle Back")) return "middle back";
  if (muscleNames.includes("Lower Back")) return "lower back";

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

export const convertDataForMuscleHeatmap = (
  data: GetDataForMuscleHeatmapQuery["getDataForMuscleHeatmap"],
) => {
  if (!data) return [];

  const newArr: IExerciseData[] | [] = [];

  data?.primaryMuscles?.forEach(el => {
    for (let i = 0; i < el.amount; i++) {
      // @ts-ignore
      newArr.push(...convertMusclesToSVGNames(el.muscleName));
    }
  });

  data?.secondaryMuscles?.forEach(el => {
    for (let i = 0; i < el.amount; i++) {
      // @ts-ignore
      newArr.push(...convertMusclesToSVGNames(el.muscleName));
    }
  });

  return newArr;
};

export const getTheMostTrainedMuscleAmount = (
  data: GetDataForMuscleHeatmapQuery["getDataForMuscleHeatmap"],
) => {
  let max = 0;

  data?.primaryMuscles?.forEach(el => {
    if (max < el.amount) max = el.amount;
  });

  data?.secondaryMuscles?.forEach(el => {
    if (max < el.amount) max = el.amount;
  });

  return max;
};

export const getThemostTraineMuscleAmountFromWorkout = (workout: Workout) => {
  let max = 0;

  const musclesArr: string[] = [];

  workout.workoutExercise.forEach(exercise => {
    if (exercise.commonExercise) {
      exercise.commonExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    } else if (exercise.userExercise) {
      exercise.userExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    }
  });

  const counts: { [key: string]: number } = {};

  musclesArr.forEach(el => {
    if (!counts[el]) {
      counts[el] = 1;
    } else {
      counts[el] += 1;
    }
  });

  for (const [key, value] of Object.entries(counts)) {
    if (value > max) max = value;
  }

  return max;
};

export const getPrimaryMusclesFromWorkout = (workout: Workout) => {
  const musclesArr: string[] = [];

  workout.workoutExercise.forEach(exercise => {
    if (exercise.commonExercise) {
      exercise.commonExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    } else if (exercise.userExercise) {
      exercise.userExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    }
  });

  return musclesArr;
};

export const getMusclesFromWorkout = (workout: Workout) => {
  const musclesArr: string[] = [];

  workout.workoutExercise.forEach(exercise => {
    if (exercise.commonExercise) {
      exercise.commonExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
      exercise.commonExercise.secondaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    } else if (exercise.userExercise) {
      exercise.userExercise.primaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
      exercise.userExercise.secondaryMuscles.forEach(el => {
        musclesArr.push(...convertMusclesToSVGNames([el]));
      });
    }
  });

  return musclesArr;
};

export const calculateVolume = (workout: Workout) => {
  let volume = 0;

  workout.workoutExercise.forEach(exercise => {
    exercise.exerciseSet.forEach(set => {
      volume = volume + set.reps * set.weight;
    });
  });

  return volume;
};

export const getTimeBetweenTwoDates = (startDate: Date, endDate: Date) => {
  const duration = moment(endDate).diff(startDate);

  if (Number.isNaN(duration)) return "0h 00m ";

  return moment.utc(duration).format("H[h] mm[m]");
};

export const convertToWeightSetChartData = (
  data: {
    date: string;
    sets: number[];
  }[],
) => {
  const arr: { [key: string]: any }[] = [];

  data.forEach(exercise => {
    const sets: { [key: string]: number } = {};

    exercise.sets.forEach((set, idx) => {
      sets[`set${idx + 1}`] = set;
    });

    arr.push({
      date: exercise.date,
      ...sets,
    });
  });

  return arr;
};

export const getHighestAmountOfSets = (data: { [key: string]: any }[]) => {
  let max = 0;
  data.forEach(exercise => {
    if (Object.keys(exercise).length > max)
      max = Object.keys(exercise).length - 1;
  });

  return max;
};

export const getExercisesAmount = (workout: Workout) => {
  return workout.workoutExercise.length;
};

export const getExercisesAmountString = (workout: Workout) => {
  if (!workout.workoutExercise) return;

  return workout.workoutExercise.length === 1
    ? `${workout.workoutExercise.length} exercise`
    : `${workout.workoutExercise.length} exercises`;
};
