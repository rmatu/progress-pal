import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  ExerciseSet,
  GetUserWorkoutQuery,
  GqlNewExerciseSet,
  useUpdateExerciseSetsMutation,
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
import { countDecimals, gramsToKilograms } from "../../utils/numberUtils";
import { useParams } from "react-router";

interface ExerciseSetsFromDBProps {
  exercise: WorkoutExercise;
  fetchedWorkout: GetUserWorkoutQuery;
  setFetchedWorkout: React.Dispatch<
    React.SetStateAction<GetUserWorkoutQuery | undefined>
  >;
}

interface ExtendedExerciseSet extends ExerciseSet {
  newSet?: boolean;
}

const ExerciseSetsFromDB: React.FC<ExerciseSetsFromDBProps> = ({
  exercise,
  fetchedWorkout,
  setFetchedWorkout,
}) => {
  const { id: workoutId } = useParams<{ id: string }>();
  const [updateExerciseSetsMutation, { data: udpateExerciseSetsData }] =
    useUpdateExerciseSetsMutation({
      onCompleted: data => {
        setEdit(false);
      },
    });

  const [edit, setEdit] = useState(false);
  const [kgInputErrors, setKgInputErrors] = useState<string[]>([]);
  const [repsInputErrors, setRepsInputErrors] = useState<string[]>([]);
  const [blockSave, setBlockSave] = useState(false);

  const populateAndChangeWeightToGrams = (sets: ExtendedExerciseSet[]) => {
    const arr = sets.map(el => ({
      ...el,
      weight: gramsToKilograms(el.weight),
    }));

    return arr;
  };

  const [exerciseSets, setExerciseSets] = useState(
    populateAndChangeWeightToGrams(exercise.exerciseSet),
  );
  const [addedSets, setAddedSets] = useState<ExerciseSet[]>([]);
  const [updatedItemsIds, setUpdatedItemsIds] = useState<Set<string>>(
    new Set(),
  );

  console.log({ exercise });
  console.log({ exerciseSets });

  const handleSave = () => {
    const exportExerciseSets: { id: string; reps: number; weight: number }[] =
      [];
    const newExerciseSets: GqlNewExerciseSet[] = [];
    if (!exerciseSets) return;

    exerciseSets.forEach((el, idx) => {
      if (el.newSet) {
        newExerciseSets.push({
          id: el.id,
          set: idx + 1,
          reps: el.reps,
          weight: el.weight,
          workoutExerciseId: exercise.id,
        });
      } else {
        exportExerciseSets.push({
          id: el.id,
          reps: el.reps,
          weight: el.weight,
        });
      }
    });
    updateExerciseSetsMutation({
      variables: {
        input: {
          workoutId: workoutId,
          exerciseSets: exportExerciseSets,
          newExerciseSets: newExerciseSets,
        },
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: ExerciseSet,
    inputType: "kg" | "reps",
  ) => {
    const value = Number(e.target.value);

    const arr = [...exerciseSets];
    const idx = exerciseSets.findIndex(el => el.id === set.id);

    if (inputType === "kg") {
      if (countDecimals(value) > 2) return;
      if (value < 0 || value > 9999) return;

      arr[idx] = { ...arr[idx], weight: value };
    } else if (inputType === "reps") {
      if (countDecimals(value) > 2) return;
      if (value < 0 || value > 99999) return;

      arr[idx] = { ...arr[idx], reps: value };
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
        newSet: true,
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
                type="number"
                step="0.01"
                min={0}
                max={9999}
                readOnly={!edit}
                tabIndex={!edit ? -1 : 1}
                value={el.weight ? el.weight : ""}
              />
            </GridItem>
            <GridItem>
              <Input
                error={repsInputErrors.some(id => id === el.id)}
                name="reps"
                onBlur={e => handleBlur(e, el)}
                onChange={e => handleChange(e, el, "reps")}
                type="number"
                step="1"
                min={0}
                max={99999}
                readOnly={!edit}
                tabIndex={!edit ? -1 : 1}
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
