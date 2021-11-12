import React, { useState } from "react";
import { WorkoutExercise } from "../../generated/graphql";
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
}

const ExerciseSetsFromDB: React.FC<ExerciseSetsFromDBProps> = ({
  exercise,
}) => {
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    setEdit(false);
  };

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
      {exercise?.exerciseSet.map((el, idx) => (
        <Grid key={el.id}>
          <GridItem>
            <SetNumber>{idx + 1}</SetNumber>
          </GridItem>
          <GridItem>
            <Input
              name="weight"
              type="text"
              pattern="[0-9]{3}"
              value={el.weight ? el.weight : ""}
              readOnly={!edit}
              tabIndex={!edit ? -1 : 1}
            />
          </GridItem>
          <GridItem>
            <Input
              name="reps"
              type="number"
              value={el.reps ? el.reps : ""}
              readOnly={!edit}
              tabIndex={!edit ? -1 : 1}
            />
          </GridItem>
          <GridItem>
            <TrashIcon>{edit && <TrashIconSVG onClick={() => {}} />}</TrashIcon>
          </GridItem>
        </Grid>
      ))}
      {edit && (
        <EditButtonsWrapper>
          <Button
            bColor={theme.colors.successTextColor}
            fontSize="1rem"
            type="button"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button fontSize="1rem" type="button">
            Add Set
          </Button>
        </EditButtonsWrapper>
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
