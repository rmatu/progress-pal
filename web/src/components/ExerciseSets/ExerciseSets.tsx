import React, { useState } from "react";
import { IExercise } from "../../constants/exercises";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { ReactComponent as TrashIconSVG } from "../../assets/svg/trash.svg";
import { ReactComponent as CancelIcon } from "../../assets/svg/bolderClose.svg";
import { Button } from "../UI";
import {
  ExerciseName,
  PrimaryMuscle,
  PrimaryMuscles,
  Grid,
  GridItem,
  Wrapper,
  SetNumber,
  Input,
  TrashIcon,
} from "./styles";

interface ExerciseSetsProps {
  exercise: IExercise;
  handleDeleteExercise: (exercise: any) => void;
}

interface ISet {
  id: number;
  kg: number | null;
  reps: number | null;
}

const ExerciseSets: React.FC<ExerciseSetsProps> = ({
  exercise,
  handleDeleteExercise,
}) => {
  const [setsAmount, setSetsAmount] = useState<ISet[]>([
    {
      id: 1,
      kg: null,
      reps: null,
    },
  ]);

  const handleAddSet = () => {
    const latestItem = setsAmount[setsAmount.length - 1];
    setSetsAmount(prev => [
      ...prev,
      {
        id: latestItem.id + 1,
        kg: latestItem.kg,
        reps: latestItem.reps,
      },
    ]);
  };

  const handleDelete = (el: ISet) => {
    if (setsAmount.length === 1) return;

    setSetsAmount(prev => prev.filter(item => item.id !== el.id));
  };

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
      {setsAmount.map((el, idx) => (
        <Grid key={el.id}>
          <GridItem>
            <SetNumber>{idx + 1}</SetNumber>
          </GridItem>
          <GridItem>
            <Input type="number" />
          </GridItem>
          <GridItem>
            <Input type="number" />
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
