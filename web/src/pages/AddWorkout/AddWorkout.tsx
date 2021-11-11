import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil.svg";
import { ReactComponent as SuccessfulWorkoutCreationSVG2 } from "../../assets/svg/successfulWorkoutCreation2.svg";
import ExerciseSets from "../../components/ExerciseSets/ExerciseSets";
import { FlexWrapperDiv } from "../../components/FlexElements";
import { Button, Heading, Popup } from "../../components/UI";
import AddWorkoutModal from "../../components/UI/AddWorkoutModal/AddWorkoutModal";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import {
  GetDataForMuscleHeatmapDocument,
  GetUserWorkoutsDocument,
  useCreateWorkoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { MAIN_PAGE, ADD_WORKOUT } from "../../constants/routes";
import { AppState } from "../../redux/rootReducer";
import theme from "../../theme/theme";
import { AddWorkoutSchema, IExportedExercise } from "../../utils/formSchemas";
import {
  ButtonWrapper,
  ExercisesList,
  NoExercisesText,
  SuccessWorkoutWrapper,
  WorkoutForm,
} from "./styles";
import { getDateXMonthsBefore } from "../../utils/dateHelpers";
import { createRefetchQueriesArray } from "../../utils/graphQLHelpers";

export interface IWorkout {
  name: string;
  exercises: IExportedExercise[];
  date: string;
}

const AddWorkout = () => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const [createWorkout] = useCreateWorkoutMutation({
    onCompleted: () => {
      resetWorkoutCreation();
      setSuccessfulWorkoutCreation(true);
    },
    onError: () => {
      setPopup({
        showPopup: true,
        text: "Something went wrong...",
      });
      setTimeout(() => {
        setPopup({
          showPopup: false,
          text: "",
        });
      }, 4000);

      resetWorkoutCreation();
    },
    refetchQueries: createRefetchQueriesArray([
      "getDataForMuscleHeatmap",
      "getUserWorkouts",
      "getUserYearlyWorkout",
    ]),
  });

  const [selectedExercises, setSelectedExercises] = useState<[]>([]);
  const [exerciseWithSets, setExerciseWithSets] = useState<IExportedExercise[]>(
    [],
  );
  const [workout, setWorkout] = useState<IWorkout>();
  const [showAddExercisesModal, setShowAddExercisesModal] =
    useState<boolean>(true);
  const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
  const [successfulWorkoutCreation, setSuccessfulWorkoutCreation] =
    useState(false);
  const [popup, setPopup] = useState({
    showPopup: false,
    text: "",
  });
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const workoutFormik = useFormik({
    initialValues: {
      name: moment().format(`[Workout] DD-MM-YYYY`),
    },
    validationSchema: AddWorkoutSchema,
    onSubmit: () => {},
  });

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

    setExerciseWithSets(prev => prev.filter(el => el.id !== exercise.id));
  };

  const handleFinishWorkout = () => {
    if (blockSubmit) return;

    if (!workout) return;

    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(el => ({
        ...el,
        sets: el.sets.map((set, idx) => ({
          set: idx + 1,
          weight: set.weight,
          reps: set.reps,
        })),
      })),
    };

    if (!updatedWorkout) return;

    createWorkout({
      variables: {
        input: {
          name: updatedWorkout.name,
          date: updatedWorkout.date,
          //@ts-ignore
          exercises: updatedWorkout.exercises,
        },
      },
    });
  };

  const resetWorkoutCreation = () => {
    setSelectedExercises([]);
    setExerciseWithSets([]);
    setWorkout(undefined);
  };

  const handleGoToDashboard = () => {
    dispatch(navActions.changeItem(MAIN_PAGE));
    history.push(MAIN_PAGE);
  };

  const handleExerciseFormikOnChange = (e: any) => {
    workoutFormik.handleChange(e);

    if (workout) {
      setWorkout({ ...workout, name: e.target.value });
    }
  };

  useEffect(() => {
    setWorkout({
      name: workoutFormik.values.name,
      date: new Date().toISOString(),
      exercises: exerciseWithSets,
    });

    for (let i = 0; i < exerciseWithSets.length; i++) {
      const error = exerciseWithSets[i].sets.some(el => {
        return el.weight === null ||
          el.weight === 0 ||
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

    if (!exerciseWithSets) setBlockSubmit(true);
  }, [exerciseWithSets]);

  useEffect(() => {
    dispatch(navActions.changeItem(ADD_WORKOUT));
  }, []);

  if (successfulWorkoutCreation) {
    return (
      <DashbordLayoutHOC user={user?.me}>
        <RightContent open={open} justifyContent="center">
          <SuccessWorkoutWrapper
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <Heading size="h2">
              Your workout has been created successfuly!
            </Heading>
            <SuccessfulWorkoutCreationSVG2 className="successfulWorkoutCreation" />
            <ButtonWrapper>
              <Button
                marginTop="2em"
                padding="0.2em 2em"
                fontSize="1.125rem"
                bColor={theme.colors.orange}
                onClick={() => {
                  setSuccessfulWorkoutCreation(false);
                  setShowAddExercisesModal(true);
                }}
                type="button"
              >
                Create new Workout
              </Button>
              <Button
                marginTop="2em"
                padding="0.2em 2em"
                fontSize="1.125rem"
                bColor={theme.colors.errorTextColor}
                onClick={handleGoToDashboard}
                type="button"
              >
                Go to Dashboard
              </Button>
            </ButtonWrapper>
          </SuccessWorkoutWrapper>
        </RightContent>
      </DashbordLayoutHOC>
    );
  }

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <WorkoutForm
          onSubmit={workoutFormik.handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <Heading size="h2">Add Workout</Heading>
          <FlexWrapperDiv justifyContent="center">
            <InputWithIcon
              name="name"
              value={workoutFormik.values.name}
              type="text"
              onChange={handleExerciseFormikOnChange}
              iconComp={<PencilIcon />}
              width="13em"
              error={workoutFormik.errors.name}
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
              onClick={handleGoToDashboard}
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

          {selectedExercises.length <= 0 && (
            <NoExercisesText>
              You need to select some exercises...
            </NoExercisesText>
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
      {showAddExercisesModal && (
        <AddWorkoutModal
          show={showAddExercisesModal}
          minHeight="40vh"
          handleClose={() => setShowAddExercisesModal(false)}
          handleSelectedItem={handleSelectedItem}
          selectedExercises={selectedExercises}
        />
      )}
      <Popup showPopup={popup.showPopup}>{popup.text}</Popup>
    </DashbordLayoutHOC>
  );
};

export default AddWorkout;
