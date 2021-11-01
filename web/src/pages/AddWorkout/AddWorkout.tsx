import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil.svg";
import ExerciseSets from "../../components/ExerciseSets/ExerciseSets";
import { FlexWrapperDiv } from "../../components/FlexElements";
import { Button, Heading } from "../../components/UI";
import AddWorkoutModal from "../../components/UI/AddWorkoutModal/AddWorkoutModal";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import { MAIN_PAGE } from "../../constants/routes";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import theme from "../../theme/theme";
import { AddWorkoutSchema, IExportedExercise } from "../../utils/formSchemas";
import { setDashboardItem } from "../../utils/setDashboardItem";
import { ButtonWrapper, ExercisesList, WorkoutForm } from "./styles";

export interface IWorkout {
  workoutName: string;
  exercises: IExportedExercise[];
}

const AddWorkout = () => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showAddExercisesModal, setShowAddExercisesModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<[]>([]);
  const [exerciseWithSets, setExerciseWithSets] = useState<IExportedExercise[]>(
    [],
  );
  const [workout, setWorkout] = useState<IWorkout>();
  const [blockSubmit, setBlockSubmit] = useState<boolean>(false);

  const { selectedItem, open } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );

  const workoutFormik = useFormik({
    initialValues: {
      workoutName: moment().format(`[Workout] DD-MM-YYYY`),
    },
    validationSchema: AddWorkoutSchema,
    onSubmit: () => {},
  });

  console.log({ blockSubmit });

  const handleSelectedItem = (exercise: any) => {
    const elementExist = selectedExercises?.find(
      // @ts-ignore
      el => el.name === exercise.name,
    );

    if (elementExist) {
      // @ts-ignore
      setSelectedExercises(prev =>
        // @ts-ignore
        prev.filter(el => el.name !== exercise.name),
      );
    } else {
      // @ts-ignore
      setSelectedExercises(prev => [...prev, exercise]);
    }
  };

  const handleFinishWorkout = () => {
    if (blockSubmit) return;

    console.log({ workout });
  };

  const handleExerciseFormikOnChange = (e: any) => {
    workoutFormik.handleChange(e);
  };

  const handleCancelWorkout = () => {
    history.push(MAIN_PAGE);
  };

  useEffect(() => {
    setWorkout({
      workoutName: workoutFormik.values.workoutName,
      exercises: exerciseWithSets,
    });

    for (let i = 0; i < exerciseWithSets.length; i++) {
      const error = exerciseWithSets[i].sets.some(el => {
        return el.kg === null ||
          el.kg === 0 ||
          el.reps === null ||
          el.reps === 0
          ? true
          : false;
      });

      if (error) {
        setBlockSubmit(true);
        break;
      } else {
        setBlockSubmit(false);
      }
    }
  }, [exerciseWithSets]);

  useEffect(() => {
    setDashboardItem(selectedItem, "add-workout", dispatch);
  }, [dispatch, selectedItem]);

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <WorkoutForm onSubmit={workoutFormik.handleSubmit}>
          <Heading size="h2">Add Workout</Heading>
          <FlexWrapperDiv justifyContent="center">
            <InputWithIcon
              name="workoutName"
              value={workoutFormik.values.workoutName}
              type="text"
              onChange={handleExerciseFormikOnChange}
              iconComp={<PencilIcon />}
              width="13em"
              error={workoutFormik.errors.workoutName}
            />
          </FlexWrapperDiv>
          <ButtonWrapper>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              onClick={() => setShowAddExercisesModal(true)}
              type="button"
            >
              Add Exercises
            </Button>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              bColor={theme.colors.errorTextColor}
              onClick={handleCancelWorkout}
              type="button"
            >
              Cancel Workout
            </Button>
          </ButtonWrapper>
          {selectedExercises.length > 0 && (
            <Button
              marginTop="2em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              bColor="#3cdfff"
              onClick={handleFinishWorkout}
              type="button"
              disabled={blockSubmit}
            >
              Finish Workout
            </Button>
          )}
          <ExercisesList>
            {selectedExercises.map(exercise => (
              <ExerciseSets
                //@ts-ignore
                key={exercise.name}
                exercise={exercise}
                handleDeleteExercise={handleSelectedItem}
                setExerciseWithSets={setExerciseWithSets}
                exerciseWithSets={exerciseWithSets}
              />
            ))}
          </ExercisesList>
        </WorkoutForm>
      </RightContent>
      {/* @ts-ignore */}
      {showAddExercisesModal && (
        <AddWorkoutModal
          show={showAddExercisesModal}
          minHeight="40vh"
          handleClose={() => setShowAddExercisesModal(false)}
          handleSelectedItem={handleSelectedItem}
          selectedExercises={selectedExercises}
        />
      )}
    </DashbordLayoutHOC>
  );
};

export default AddWorkout;
