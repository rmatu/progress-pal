import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ExerciseSets from "../../../components/ExerciseSets/ExerciseSets";
import ExerciseSetsFromDB from "../../../components/ExerciseSetsFromDB/ExerciseSetsFromDB";
import { Button, Heading, Modal } from "../../../components/UI";
import AddWorkoutModal from "../../../components/UI/AddWorkoutModal/AddWorkoutModal";
import Calendar from "../../../components/UI/Date/Calendar/Calendar";
import Loader from "../../../components/UI/Loader/Loader";
import Popup from "../../../components/UI/Popup/Popup";
import {
  GetUserWorkoutQuery,
  useAddNewExercisesToTheWorkoutMutation,
  useGetUserWorkoutLazyQuery,
  useMeQuery,
  WorkoutExercise,
} from "../../../generated/graphql";
import DashbordLayoutHOC from "../../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../../hoc/styles";
import * as navActions from "../../../redux/dashboardNavbar/dashboardNavbarActions";
import * as popupActions from "../../../redux/popup/popupActions";
import { AppState } from "../../../redux/rootReducer";
import theme from "../../../theme/theme";
import { IExportedExercise } from "../../../utils/formSchemas";
import { createRefetchQueriesArray } from "../../../utils/graphQLHelpers";
import { ReactComponent as CalendarSVG } from "../../../assets/svg/calendar.svg";
import { ReactComponent as PencilSVG } from "../../../assets/svg/pencil.svg";
import {
  ButtonsWrapper,
  ContentWrapper,
  Date,
  GeneralInfoWrapper,
  WorkoutHeading,
  WorkoutHeadingWrapper,
} from "./styles";
import CalendarWithTimeModal from "../../../components/UI/CalendarWithTimeModal/CalendarWithTimeModal";

interface WorkoutProps {}

// How do I handle updating workout on DOM and on the backend:
// DOM:
//   -> I store the workoutData in fetchedWorkout variable
//   -> Use setFetchedWorkout to update the DOM
//   -> On each update pass that updated set to the setArray
// Backend:
//   -> Send only updated and new sets to the backend

const Workout: React.FC<WorkoutProps> = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user } = useMeQuery();
  const [getWorkout, { data: workoutData }] = useGetUserWorkoutLazyQuery();
  const [addNewExercisesToTheWorkout] = useAddNewExercisesToTheWorkoutMutation({
    onCompleted: ({ addNewExercisesToTheWorkout }) => {
      if (addNewExercisesToTheWorkout) {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: true,
            text: "Exercise deleted successfuly!",
            popupType: "success",
          }),
        );
        setTimeout(() => {
          dispatch(
            popupActions.setPopupVisibility({
              visibility: false,
              text: "Exercise deleted successfuly!",
              popupType: "success",
            }),
          );
        }, 4000);
      }
      setSelectedExercises([]);
      setExerciseWithSets([]);
    },
    onError: ApolloError => {
      dispatch(
        popupActions.setPopupVisibility({
          visibility: true,
          text: ApolloError.message,
          popupType: "error",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: ApolloError.message,
            popupType: "error",
          }),
        );
      }, 4000);
    },
    refetchQueries: createRefetchQueriesArray(["getUserWorkout"], {
      workoutId: id,
    }),
  });

  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
  const [editGeneralInfo, setEditGeneralInfo] = useState<boolean>(false);
  const [fetchedWorkout, setFetchedWorkout] = useState<GetUserWorkoutQuery>();
  const [showAddExercisesModal, setShowAddExercisesModal] =
    useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [dateWithTime, setDateWithTime] = useState<
    | {
        startTime: string;
        endTime: string;
        date: Date;
      }
    | undefined
  >();
  const [selectedExercises, setSelectedExercises] = useState<[]>([]);
  const [exerciseWithSets, setExerciseWithSets] = useState<IExportedExercise[]>(
    [],
  );

  console.log({ dateWithTime });

  const dispatch = useDispatch();

  const handleAddExercise = () => {
    setShowAddExercisesModal(true);
  };

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

  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  const handlePencilClick = () => {
    setEditGeneralInfo(true);
  };

  const handleCancelChangeGeneralInfo = () => {
    setEditGeneralInfo(false);
  };

  const handleSaveNewExercises = () => {
    if (blockSubmit) return;
    if (!workoutData) return;
    if (!workoutData.getUserWorkout) return;

    const variables = {
      input: {
        workoutId: workoutData.getUserWorkout.id,
        exercises: exerciseWithSets.map(el => ({
          ...el,
          sets: el.sets.map((set, idx) => ({
            set: idx + 1,
            weight: set.weight,
            reps: set.reps,
          })),
        })),
      },
    };

    if (!variables) return;

    //@ts-ignore
    addNewExercisesToTheWorkout({ variables });
  };

  useEffect(() => {
    if (!exerciseWithSets) setBlockSubmit(true);

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
    if (id) {
      getWorkout({
        variables: {
          workoutId: id,
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (!workoutData) return;

    setFetchedWorkout(workoutData);
  }, [workoutData]);

  useEffect(() => {
    dispatch(navActions.changeItem(""));
  }, []);

  if (!fetchedWorkout) {
    return (
      <DashbordLayoutHOC user={user?.me}>
        <RightContent open={open}>
          <Loader layoutLoaderUI />
        </RightContent>
      </DashbordLayoutHOC>
    );
  }

  console.log({ workoutData });

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <ContentWrapper>
          <GeneralInfoWrapper>
            <Heading size="h2" textAlign="left" padding="0">
              {fetchedWorkout?.getUserWorkout?.name}{" "}
            </Heading>
            {!editGeneralInfo && (
              <PencilSVG id="pencil" onClick={handlePencilClick} />
            )}
          </GeneralInfoWrapper>
          <GeneralInfoWrapper>
            <Date>
              {!dateWithTime?.date &&
                moment(fetchedWorkout?.getUserWorkout?.updatedAt, "x").format(
                  "DD MMMM YYYY - HH:MM",
                )}
              {dateWithTime?.date &&
                moment(dateWithTime.date).format("DD MMMM YYYY - HH:MM")}
            </Date>
            {editGeneralInfo && <CalendarSVG onClick={handleCalendarClick} />}
          </GeneralInfoWrapper>
          {editGeneralInfo && (
            <ButtonsWrapper margin="2em 0 0 0">
              <Button
                bColor={theme.colors.successTextColor}
                fontSize="1rem"
                type="button"
              >
                Save
              </Button>
              <Button
                bColor={theme.colors.errorTextColor}
                fontSize="1rem"
                type="button"
                onClick={handleCancelChangeGeneralInfo}
              >
                Cancel
              </Button>
            </ButtonsWrapper>
          )}

          <WorkoutHeadingWrapper margin="2em 0">
            <WorkoutHeading>Exercises</WorkoutHeading>
          </WorkoutHeadingWrapper>

          {fetchedWorkout?.getUserWorkout?.workoutExercise.map(exercise => (
            <ExerciseSetsFromDB
              key={exercise.id}
              exercise={exercise as WorkoutExercise}
            />
          ))}

          {/* NEW EXERCISES ADDED TO THE WORKOUT */}

          {selectedExercises.map(exercise => (
            <ExerciseSets
              //@ts-ignore
              key={exercise.name}
              exercise={exercise}
              handleDeleteExercise={handleSelectedItem}
              setExerciseWithSets={setExerciseWithSets}
              exerciseWithSets={exerciseWithSets}
              matchExerciseSetsFromDBStyle
            />
          ))}

          <ButtonsWrapper>
            <Button
              bColor={theme.colors.orange}
              fontSize="1rem"
              type="button"
              onClick={handleAddExercise}
            >
              Add New Exercise
            </Button>
            {exerciseWithSets.length > 0 && (
              <Button
                bColor={theme.colors.successTextColor}
                fontSize="1rem"
                type="button"
                onClick={handleSaveNewExercises}
                disabled={blockSubmit}
              >
                Save New Exercises
              </Button>
            )}
          </ButtonsWrapper>
        </ContentWrapper>
      </RightContent>
      <Popup showPopup={show} error={popupType === "error"}>
        {text}
      </Popup>
      {showAddExercisesModal && (
        <AddWorkoutModal
          show={showAddExercisesModal}
          minHeight="40vh"
          handleClose={() => setShowAddExercisesModal(false)}
          handleSelectedItem={handleSelectedItem}
          selectedExercises={selectedExercises}
        />
      )}
      {showCalendar && (
        <CalendarWithTimeModal
          setDateWithTime={setDateWithTime}
          opened={showCalendar}
          close={() => setShowCalendar(false)}
        />
      )}
    </DashbordLayoutHOC>
  );
};
export default Workout;
