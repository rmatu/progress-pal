import React, { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../assets/svg/bolderClose.svg";
import { ReactComponent as TrashIconSVG } from "../../assets/svg/trash.svg";
import { ReactComponent as InfoSVG } from "../../assets/svg/info.svg";
import { IExercise } from "../../constants/exercises";
import { sanitazeMuscleNameFromDB } from "../../utils/converters";
import { IExportedExercise, ISet } from "../../utils/formSchemas";
import { countDecimals } from "../../utils/numberUtils";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { InfoSVGWrapper } from "../ExerciseSetsFromDB/styles";
import { Button } from "../UI";
import WorkoutInstructionModal from "../UI/WorkoutInstructionModal/WorkoutInstructionModal";
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
import { WorkoutExercise } from "../../generated/graphql";

interface ExerciseSetsProps {
  exercise: IExercise;
  handleDeleteExercise: (exercise: any) => void;
  setExerciseWithSets?: React.Dispatch<
    React.SetStateAction<IExportedExercise[]>
  >;
  exerciseWithSets: IExportedExercise[];
  matchExerciseSetsFromDBStyle?: boolean;
}

const ExerciseSets: React.FC<ExerciseSetsProps> = ({
  exercise,
  exerciseWithSets,
  matchExerciseSetsFromDBStyle,
  handleDeleteExercise,
  setExerciseWithSets,
}) => {
  const [exportedExercise, setSetsAmount] = useState<IExportedExercise>({
    id: exercise.id,
    name: exercise.name,
    isCommonExercise: exercise.isCommonExercise,
    sets: [
      {
        id: 1,
        weight: null,
        reps: null,
      },
    ],
  });

  const [kgInputErrors, setKgInputErrors] = useState<number[]>([]);
  const [repsInputErrors, setRepsInputErrors] = useState<number[]>([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleAddSet = () => {
    const latestItem = exportedExercise.sets[exportedExercise.sets.length - 1];
    setSetsAmount(prev => ({
      ...prev,
      sets: [
        ...prev.sets,
        {
          id: latestItem.id + 1,
          weight: null,
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

    const arr = { ...exportedExercise, sets: [...exportedExercise.sets] };
    const idx = arr.sets.findIndex(item => item.id === el.id);

    if (name === "weight") {
      if (countDecimals(value) > 2) return;
      if (value < 0 || value > 9999) return;

      arr.sets[idx].weight = value;
    } else if (name === "reps") {
      if (countDecimals(value) >= 1) return;
      if (value < 0 || value > 99999) return;

      arr.sets[idx].reps = value;
    }

    if (name === "weight" && !el.weight) {
      setKgInputErrors(prev => prev.filter(id => id !== el.id));
    }

    if (name === "reps" && !el.reps) {
      setRepsInputErrors(prev => prev.filter(id => id !== el.id));
    }

    setSetsAmount(arr);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, set: ISet) => {
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

  useEffect(() => {
    if (setExerciseWithSets) {
      if (!exerciseWithSets.length) {
        setExerciseWithSets(prev => [...prev, exportedExercise]);
      } else {
        const arr = [...exerciseWithSets];
        const idx = arr.findIndex(el => el.name === exercise.name);
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
    <Wrapper matchExerciseSetsFromDBStyle={matchExerciseSetsFromDBStyle}>
      <ExerciseName>
        {exercise?.name}
        <InfoSVGWrapper>
          <InfoSVG onClick={() => setOpenInfoModal(true)} />
        </InfoSVGWrapper>
      </ExerciseName>
      <PrimaryMuscles>
        {exercise?.primaryMuscles?.map((name, idx) => (
          <PrimaryMuscle key={name}>
            {capitalizeFirstLetter(sanitazeMuscleNameFromDB([name]))}
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
              name="weight"
              type="number"
              step="0.01"
              min={0}
              max={9999}
              value={el.weight ? el.weight : ""}
              onChange={e => handleChange(e, el)}
              onBlur={e => handleBlur(e, el)}
              error={!!kgInputErrors.find(id => id === el.id)}
            />
          </GridItem>
          <GridItem>
            <Input
              name="reps"
              type="number"
              step="1"
              min={0}
              max={99999}
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
        onClick={() => {
          handleDeleteExercise(exercise);
          if (setExerciseWithSets) {
            setExerciseWithSets(prev =>
              prev.filter(el => el.name !== exercise.name),
            );
          }
        }}
      />
      {openInfoModal && (
        <WorkoutInstructionModal
          opened={openInfoModal}
          exactExercise={exercise}
          close={() => setOpenInfoModal(false)}
        />
      )}
    </Wrapper>
  );
};
export default ExerciseSets;
