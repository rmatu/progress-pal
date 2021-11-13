import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  ExerciseSet,
  GetUserWorkoutQuery,
  WorkoutExercise,
} from "../../generated/graphql";
import { sanitazeMuscleNameFromDB } from "../../utils/converters";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { ReactComponent as CancelIcon } from "../../assets/svg/bolderClose.svg";
import { ReactComponent as TrashIconSVG } from "../../assets/svg/trash.svg";
import { ReactComponent as PencilSVG } from "../../assets/svg/pencil.svg";
import { Button } from "../UI";
import {
  EditButtonsWrapper,
  ExerciseName,
  Grid,
  GridItem,
  Input,
  PrimaryMuscle,
  PrimaryMuscles,
  SetNumber,
  TrashIcon,
  Wrapper,
} from "./styles";
import theme from "../../theme/theme";

interface ExerciseSetsFromDBProps {
  exercise: WorkoutExercise;
  fetchedWorkout: GetUserWorkoutQuery;
  setFetchedWorkout: React.Dispatch<
    React.SetStateAction<GetUserWorkoutQuery | undefined>
  >;
}

const ExerciseSetsFromDB: React.FC<ExerciseSetsFromDBProps> = ({
  exercise,
  fetchedWorkout,
  setFetchedWorkout,
}) => {
  const [edit, setEdit] = useState(false);
  const [kgInputErrors, setKgInputErrors] = useState<string[]>([]);
  const [repsInputErrors, setRepsInputErrors] = useState<string[]>([]);
  const [blockSave, setBlockSave] = useState(false);

  const [exerciseSets, setExerciseSets] = useState(exercise.exerciseSet);
  const [addedSets, setAddedSets] = useState<ExerciseSet[]>([]);
  const [updatedItemsIds, setUpdatedItemsIds] = useState<Set<string>>(
    new Set(),
  );

  const handleSave = () => {
    setEdit(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: ExerciseSet,
    inputType: "kg" | "reps",
  ) => {
    const arr = [...exerciseSets];
    const idx = exerciseSets.findIndex(el => el.id === set.id);

    if (inputType === "kg") {
      arr[idx] = { ...arr[idx], weight: Number(e.target.value) };
    } else if (inputType === "reps") {
      arr[idx] = { ...arr[idx], reps: Number(e.target.value) };
    }

    setUpdatedItemsIds(prev => prev.add(set.id));

    setExerciseSets(arr);
  };

  const handleDeleteSet = (set: ExerciseSet) => {
    setExerciseSets(prev => prev.filter(el => el.id !== set.id));
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: ExerciseSet,
  ) => {
    const name = e.target.name;
    console.log({ name });

    if (name === "weight" && !set.weight) {
      setKgInputErrors(prev => [...prev, set.id]);
    } else if (name === "weight") {
      setKgInputErrors(prev => prev.filter(id => id !== set.id));
    }

    if (name === "reps" && !set.reps) {
      setRepsInputErrors(prev => [...prev, set.id]);
    } else if (name === "reps") {
      setRepsInputErrors(prev => prev.filter(id => id !== set.id));
    }
  };

  const handleCancel = () => {
    setExerciseSets(exercise.exerciseSet);
    setUpdatedItemsIds(new Set());
    setEdit(false);
  };

  const handleAddSet = () => {
    //@ts-ignore
    setExerciseSets(prev => [
      ...prev,
      {
        id: v4(),
        reps: null,
        weight: null,
        set: exerciseSets.length + 1,
        __typename: "ExerciseSet",
      },
    ]);
  };

  const sortBaseOnSet = (a: ExerciseSet, b: ExerciseSet) => {
    if (a.set < b.set) {
      return -1;
    }
    if (a.set > b.set) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    for (let i = 0; i < exerciseSets.length; i++) {
      const error = exerciseSets.some(el => {
        return el.weight === null ||
          el.weight === 0 ||
          el.reps === null ||
          el.reps === 0
          ? true
          : false;
      });

      if (error) {
        setBlockSave(true);
      } else {
        setBlockSave(false);
      }
    }

    if (!exerciseSets) setBlockSave(true);
  }, [exerciseSets]);

  return (
    <Wrapper>
      <ExerciseName>
        {exercise?.userExercise?.name || exercise?.commonExercise?.name}
      </ExerciseName>
      <PrimaryMuscles>
        {exercise?.commonExercise?.primaryMuscles?.map((name, idx) => (
          <PrimaryMuscle key={name}>
            {capitalizeFirstLetter(sanitazeMuscleNameFromDB([name]))}
            {idx !== exercise!.commonExercise!.primaryMuscles!.length - 1 &&
              ","}
          </PrimaryMuscle>
        ))}
      </PrimaryMuscles>
      <PrimaryMuscles>
        {exercise?.userExercise?.primaryMuscles?.map((name, idx) => (
          <PrimaryMuscle key={name}>
            {capitalizeFirstLetter(sanitazeMuscleNameFromDB([name]))}
            {idx !== exercise!.userExercise!.primaryMuscles!.length - 1 && ","}
          </PrimaryMuscle>
        ))}
      </PrimaryMuscles>
      <Grid>
        <GridItem>Set</GridItem>
        <GridItem>Kg</GridItem>
        <GridItem>Reps</GridItem>
        <GridItem svg>
          <PencilSVG onClick={() => setEdit(prev => !prev)} />
        </GridItem>
      </Grid>
      {exerciseSets
        .slice()
        .sort(sortBaseOnSet)
        .map((el, idx) => (
          <Grid key={el.id}>
            <GridItem>
              <SetNumber>{idx + 1}</SetNumber>
            </GridItem>
            <GridItem>
              <Input
                error={kgInputErrors.some(id => id === el.id)}
                name="weight"
                onBlur={e => handleBlur(e, el)}
                onChange={e => handleChange(e, el, "kg")}
                pattern="[0-9]{3}"
                readOnly={!edit}
                tabIndex={!edit ? -1 : 1}
                type="text"
                value={el.weight ? el.weight : ""}
              />
            </GridItem>
            <GridItem>
              <Input
                error={repsInputErrors.some(id => id === el.id)}
                name="reps"
                onBlur={e => handleBlur(e, el)}
                onChange={e => handleChange(e, el, "reps")}
                readOnly={!edit}
                tabIndex={!edit ? -1 : 1}
                type="number"
                value={el.reps ? el.reps : ""}
              />
            </GridItem>
            <GridItem>
              <TrashIcon>
                {edit && <TrashIconSVG onClick={() => handleDeleteSet(el)} />}
              </TrashIcon>
            </GridItem>
          </Grid>
        ))}
      {edit && (
        <>
          <EditButtonsWrapper>
            <Button
              bColor={theme.colors.successTextColor}
              fontSize="1rem"
              type="button"
              onClick={handleSave}
              disabled={blockSave}
            >
              Save
            </Button>
            <Button
              bColor={theme.colors.errorTextColor}
              fontSize="1rem"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </EditButtonsWrapper>
          <EditButtonsWrapper margin="1em 0">
            <Button fontSize="1rem" type="button" onClick={handleAddSet}>
              Add Set
            </Button>
          </EditButtonsWrapper>
        </>
      )}
      {edit && (
        <CancelIcon
          id="cancelIcon"
          // onClick={() => {
          //   if (!handleDeleteExercise || !exercise) return;

          //   if (setExerciseWithSets) {
          //     setExerciseWithSets(prev =>
          //       prev.filter(el => el.name !== exercise.name),
          //     );
          //   }
          // }}
        />
      )}
    </Wrapper>
  );
};
export default ExerciseSetsFromDB;
