import React, { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../assets/svg/bolderClose.svg";
import { ReactComponent as TrashIconSVG } from "../../assets/svg/trash.svg";
import { IExercise } from "../../constants/exercises";
import { IExportedExercise, ISet } from "../../utils/formSchemas";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { Button } from "../UI";
import {
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

interface ExerciseSetsProps {
  exercise: IExercise;
  handleDeleteExercise: (exercise: any) => void;
  setExerciseWithSets?: React.Dispatch<
    React.SetStateAction<IExportedExercise[]>
  >;
  exerciseWithSets: IExportedExercise[];
}

const ExerciseSets: React.FC<ExerciseSetsProps> = ({
  exercise,
  exerciseWithSets,
  handleDeleteExercise,
  setExerciseWithSets,
}) => {
  const [exportedExercise, setSetsAmount] = useState<IExportedExercise>({
    exerciseName: exercise.name,
    sets: [
      {
        id: 1,
        kg: null,
        reps: null,
      },
    ],
  });

  const [kgInputErrors, setKgInputErrors] = useState<number[]>([]);
  const [repsInputErrors, setRepsInputErrors] = useState<number[]>([]);

  const handleAddSet = () => {
    const latestItem = exportedExercise.sets[exportedExercise.sets.length - 1];
    setSetsAmount(prev => ({
      ...prev,
      sets: [
        ...prev.sets,
        {
          id: latestItem.id + 1,
          kg: null,
          reps: null,
        },
      ],
    }));
  };

  const handleDelete = (el: ISet) => {
    if (exportedExercise.sets.length === 1) return;

    setSetsAmount(prev => ({
      ...prev,
      sets: [...prev.sets.filter(item => item.id !== el.id)],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, el: ISet) => {
    const name = e.target.name;
    const value = Number(e.target.value);

    const minusKey = e.target.value[e.target.value.length - 1];

    if (minusKey === "-") return;

    const arr = { ...exportedExercise, sets: [...exportedExercise.sets] };
    const idx = arr.sets.findIndex(item => item.id === el.id);

    if (name === "kg" && !el.kg) {
      setKgInputErrors(prev => prev.filter(id => id !== el.id));
    }

    if (name === "reps" && !el.reps) {
      setRepsInputErrors(prev => prev.filter(id => id !== el.id));
    }

    if (name === "kg") {
      if (value < 0 || value > 1500) return;
      arr.sets[idx].kg = value;
    } else if (name === "reps") {
      if (value < 0 || value > 100) return;
      arr.sets[idx].reps = value;
    }

    setSetsAmount(arr);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, set: ISet) => {
    const name = e.target.name;
    if (name === "kg" && !set.kg) {
      setKgInputErrors(prev => [...prev, set.id]);
    } else {
      setKgInputErrors(prev => prev.filter(id => id !== set.id));
    }

    if (name === "reps" && !set.reps) {
      setRepsInputErrors(prev => [...prev, set.id]);
    } else {
      setRepsInputErrors(prev => prev.filter(id => id !== set.id));
    }
  };

  useEffect(() => {
    if (setExerciseWithSets) {
      if (!exerciseWithSets.length) {
        setExerciseWithSets(prev => [...prev, exportedExercise]);
      } else {
        const arr = [...exerciseWithSets];
        const idx = arr.findIndex(el => el.exerciseName === exercise.name);
        if (idx < 0) {
          setExerciseWithSets(prev => [...prev, exportedExercise]);
        } else {
          arr[idx] = exportedExercise;
          setExerciseWithSets(arr);
        }
      }
    }
  }, [exportedExercise]);

  return (
    <Wrapper>
      <ExerciseName>{exercise?.name}</ExerciseName>
      <PrimaryMuscles>
        {exercise?.primaryMuscles?.map((name, idx) => (
          <PrimaryMuscle key={name}>
            {capitalizeFirstLetter(name)}
            {idx !== exercise?.primaryMuscles?.length - 1 && ","}
          </PrimaryMuscle>
        ))}
      </PrimaryMuscles>
      <Grid>
        <GridItem>Set</GridItem>
        <GridItem>Kg</GridItem>
        <GridItem>Reps</GridItem>
      </Grid>
      {exportedExercise.sets.map((el, idx) => (
        <Grid key={el.id}>
          <GridItem>
            <SetNumber>{idx + 1}</SetNumber>
          </GridItem>
          <GridItem>
            <Input
              name="kg"
              type="text"
              pattern="[0-9]{3}"
              value={el.kg ? el.kg : ""}
              onChange={e => handleChange(e, el)}
              onBlur={e => handleBlur(e, el)}
              error={!!kgInputErrors.find(id => id === el.id)}
            />
          </GridItem>
          <GridItem>
            <Input
              name="reps"
              type="number"
              value={el.reps ? el.reps : ""}
              onChange={e => handleChange(e, el)}
              onBlur={e => handleBlur(e, el)}
              error={!!repsInputErrors.find(id => id === el.id)}
            />
          </GridItem>
          <GridItem>
            <TrashIcon>
              <TrashIconSVG onClick={() => handleDelete(el)} />
            </TrashIcon>
          </GridItem>
        </Grid>
      ))}
      <Button
        marginTop="1em"
        onClick={handleAddSet}
        padding="0.2em 4em"
        fontSize="1rem"
        type="button"
      >
        Add Set
      </Button>
      <CancelIcon
        id="cancelIcon"
        onClick={() => handleDeleteExercise(exercise)}
      />
    </Wrapper>
  );
};
export default ExerciseSets;
