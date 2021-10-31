// prettier-ignore
export const Muscle = {
  anyBodyCategory: "Any Body Category",
  abdominals: "Abdominals",       // miesnie brzucha
  adductors: "Adductors",         // mięsień odwodzący
  biceps: "Biceps",               // biceps
  calves: "Calves",               // calves
  chest: "Chest",                 // klatka piersiowa
  forearms: "Forearms",           // przedramiona
  glutes: "Glutes",               // pośladki
  hamstrings: "Hamstrings",       // uda
  lats: "Lats",                   // motyle
  lowerBack: "Lower back",        // dolna część pleców
  middleBack: "Middle back",      // środek pleców
  neck: "Neck",                   // szyja
  quadriceps: "Quadriceps",       // mięsień czworogłowy
  shoulders: "Shoulders",         // barki
  traps: "Traps",                 // górna część pleców, pod szyją
  triceps: "Triceps",             // triceps
};

export enum EMuscle {
  abdominals = "abdominals",
  hamstrings = "hamstrings",
  calves = "calves",
  shoulders = "shoulders",
  adductors = "adductors",
  glutes = "glutes",
  quadriceps = "quadriceps",
  biceps = "biceps",
  forearms = "forearms",
  abductors = "abductors",
  triceps = "triceps",
  chest = "chest",
  lower_back = "lower back",
  traps = "traps",
  middle_back = "middle back",
  lats = "lats",
  neck = "neck",
}

export enum Force {
  pull = "pull",
  push = "push",
  static = "static",
}

export enum Level {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert",
}

export enum Mechanic {
  compound = "compound",
  isolation = "isolation",
}

export enum Equipment {
  body = "body only",
  machine = "machine",
  kettlebells = "kettlebells",
  dumbbell = "dumbbell",
  cable = "cable",
  barbell = "barbell",
  bands = "bands",
  medicine_ball = "medicine ball",
  exercise_ball = "exercise ball",
  e_z_curl_bar = "e-z curl bar",
  foam_roll = "foam roll",
}

export enum Category {
  strength = "strength",
  stretching = "stretching",
  plyometrics = "plyometrics",
  strongman = "strongman",
  powerlifting = "powerlifting",
  cardio = "cardio",
  olympic_weightlifting = "olympic weightlifting",
  crossfit = "crossfit",
  weighted_bodyweight = "weighted bodyweight",
  assisted_bodyweight = "assisted bodyweight",
}

export interface IExercise {
  name: string;
  aliases?: string[];
  primaryMuscles: EMuscle[];
  secondaryMuscles: EMuscle[];
  force?: Force;
  level: Level;
  mechanic?: Mechanic;
  equipment?: Equipment;
  category: Category;
  instructions: string[];
  description?: string;
  tips?: string[];
}

export const MockedExercises = [
  {
    name: "Adductor",
    force: "static",
    level: "intermediate",
    mechanic: "isolation",
    equipment: "foam roll",
    primaryMuscles: ["adductors", "chest"],
    secondaryMuscles: [],
    instructions: [
      "Lie face down with one leg on a foam roll.",
      "Rotate the leg so that the foam roll contacts against your inner thigh. Shift as much weight onto the foam roll as can be tolerated.",
      "While trying to relax the muscles if the inner thigh, roll over the foam between your hip and knee, holding points of tension for 10-30 seconds. Repeat with the other leg.",
    ],
    category: "stretching",
  },
  {
    name: "Alternating Cable Shoulder Press",
    force: "push",
    level: "beginner",
    mechanic: "compound",
    equipment: "cable",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps"],
    instructions: [
      "Move the cables to the bottom of the tower and select an appropriate weight.",
      "Grasp the cables and hold them at shoulder height, palms facing forward. This will be your starting position.",
      "Keeping your head and chest up, extend through the elbow to press one side directly over head.",
      "After pausing at the top, return to the starting position and repeat on the opposite side.",
    ],
    category: "strength",
  },
  {
    name: "Alternating Floor Press",
    force: "push",
    level: "beginner",
    mechanic: "compound",
    equipment: "kettlebells",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["abdominals", "shoulders", "triceps"],
    instructions: [
      "Lie on the floor with two kettlebells next to your shoulders.",
      "Position one in place on your chest and then the other, gripping the kettlebells on the handle with the palms facing forward.",
      "Extend both arms, so that the kettlebells are being held above your chest. Lower one kettlebell, bringing it to your chest and turn the wrist in the direction of the locked out kettlebell.",
      "Raise the kettlebell and repeat on the opposite side.",
    ],
    category: "strength",
  },
  {
    name: "Barbell Lunge",
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "barbell",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["calves", "glutes", "hamstrings"],
    instructions: [
      "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just below shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.",
      "Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.",
      "Step away from the rack and step forward with your right leg and squat down through your hips, while keeping the torso upright and maintaining balance. Inhale as you go down. Note: Do not allow your knee to go forward beyond your toes as you come down, as this will put undue stress on the knee joint. li>",
      "Using mainly the heel of your foot, push up and go back to the starting position as you exhale.",
      "Repeat the movement for the recommended amount of repetitions and then perform with the left leg.",
    ],
    category: "strength",
  },
  {
    name: "Chin-Up",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "forearms", "middle back"],
    instructions: [
      "Grab the pull-up bar with the palms facing your torso and a grip closer than the shoulder width.",
      "As you have both arms extended in front of you holding the bar at the chosen grip width, keep your torso as straight as possible while creating a curvature on your lower back and sticking your chest out. This is your starting position. Tip: Keeping the torso as straight as possible maximizes biceps stimulation while minimizing back involvement.",
      "As you breathe out, pull your torso up until your head is around the level of the pull-up bar. Concentrate on using the biceps muscles in order to perform the movement. Keep the elbows close to your body. Tip: The upper torso should remain stationary as it moves through space and only the arms should move. The forearms should do no other work other than hold the bar.",
      "After a second of squeezing the biceps in the contracted position, slowly lower your torso back to the starting position; when your arms are fully extended. Breathe in as you perform this portion of the movement.",
      "Repeat this motion for the prescribed amount of repetitions.",
    ],
    category: "strength",
  },
  {
    name: "Smith Machine Calf Raise",
    force: "push",
    level: "beginner",
    mechanic: "isolation",
    equipment: "machine",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    instructions: [
      "Place a block or weight plate below the bar on the Smith machine. Set the bar to a position that best matches your height. Once the correct height is chosen and the bar is loaded, step onto the plates with the balls of your feet and place the bar on the back of your shoulders.",
      "Take the bar with both hands facing forward. Rotate the bar to unrack it. This will be your starting position.",
      "Raise your heels as high as possible by pushing off of the balls of your feet, flexing your calf at the top of the contraction. Your knees should remain extended. Hold the contracted position for a second before you start to go back down.",
      "Return slowly to the starting position as you breathe in while lowering your heels.",
      "Repeat for the recommended amount of repetitions.",
    ],
    category: "strength",
  },
];
