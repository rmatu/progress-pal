import { ExerciseSet } from "src/entities/ExerciseSet";

// Muscle names for MuscleBarChartData
//   name: "Shoulder"
//   name: "Glutes"
//   name: "Adduct"
//   name: "Biceps"
//   name: "Calves"
//   name: "Chest"
//   name: "Forearm"
//   name: "Abs"
//   name: "Hamstring"
//   name: "Lats"
//   name: "Traps"
//   name: "Mid Back,
//   name: "Quads"
//   name: "Triceps"
//   name: "Neck"
//   name: "Low Back,

const updateMuscleBarChartDataObject = (
  muscleBarChartMuscleName: string,
  muscleBarChartData: { name: string; volume: number }[],
  exerciseSet: ExerciseSet,
) => {
  let volume = 0;
  //@ts-ignore
  exerciseSet.forEach(set => {
    volume = volume + set.reps * set.weight;
  });
  const idx = muscleBarChartData.findIndex(
    el => el.name === muscleBarChartMuscleName,
  );
  volume /= 1000; // in kg
  muscleBarChartData[idx].volume += volume;
};

export const updateMuscleBarChartDataArr = (
  muscleNamesArr: string[],
  muscleBarChartData: { name: string; volume: number }[],
  exerciseSet: ExerciseSet,
) => {
  muscleNamesArr.forEach(muscleName => {
    if (muscleName === "abdominals")
      updateMuscleBarChartDataObject("Abs", muscleBarChartData, exerciseSet);
    if (muscleName === "adductors")
      updateMuscleBarChartDataObject("Adduct", muscleBarChartData, exerciseSet);
    if (muscleName === "calves")
      updateMuscleBarChartDataObject("Calves", muscleBarChartData, exerciseSet);
    if (muscleName === "chest")
      updateMuscleBarChartDataObject("Chest", muscleBarChartData, exerciseSet);
    if (muscleName === "biceps")
      updateMuscleBarChartDataObject("Biceps", muscleBarChartData, exerciseSet);
    if (muscleName === "forearms")
      updateMuscleBarChartDataObject(
        "Forearm",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "lats")
      updateMuscleBarChartDataObject("Lats", muscleBarChartData, exerciseSet);
    if (muscleName === "lower back")
      updateMuscleBarChartDataObject(
        "Low Back",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === `"lower back"`)
      updateMuscleBarChartDataObject(
        "Low Back",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === `"middle back"`)
      updateMuscleBarChartDataObject(
        "Mid Back",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "middleBack")
      updateMuscleBarChartDataObject(
        "Mid Back",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "middle back")
      updateMuscleBarChartDataObject(
        "Mid Back",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "neck")
      updateMuscleBarChartDataObject("Neck", muscleBarChartData, exerciseSet);
    if (muscleName === "quadriceps")
      updateMuscleBarChartDataObject("Quads", muscleBarChartData, exerciseSet);
    if (muscleName === "shoulders")
      updateMuscleBarChartDataObject(
        "Shoulder",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "traps")
      updateMuscleBarChartDataObject("Traps", muscleBarChartData, exerciseSet);
    if (muscleName === "triceps")
      updateMuscleBarChartDataObject(
        "Triceps",
        muscleBarChartData,
        exerciseSet,
      );
    if (muscleName === "glutes")
      updateMuscleBarChartDataObject("Glutes", muscleBarChartData, exerciseSet);
    if (muscleName === "hamstrings")
      updateMuscleBarChartDataObject(
        "Hamstring",
        muscleBarChartData,
        exerciseSet,
      );
  });

  return muscleBarChartData;
};
