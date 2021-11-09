import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ReactComponent as CalendarIcon } from "../../assets/svg/calendar.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { ReactComponent as WeightIcon } from "../../assets/svg/weight.svg";
import { Heading } from "../../components/UI";
import DateRangePickerModal from "../../components/UI/DateRangePickerModal/DateRangePickerModal";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import Loader from "../../components/UI/Loader/Loader";
import { WORKOUTS } from "../../constants/routes";
import {
  useGetUserWorkoutsLazyQuery,
  useMeQuery,
  Workout,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { AppState } from "../../redux/rootReducer";
import {
  getMusclesFromWorkout,
  getThemostTraineMuscleAmountFromWorkout,
} from "../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../utils/cssHelpers";
import {
  getDateXMonthsBefore,
  isNewMonthTimeStamp,
} from "../../utils/dateHelpers";
import { SearchSchema } from "../../utils/formSchemas";
import {
  CalendarWrapper,
  ContentWrapper,
  ExerciseSVG,
  LeftCardContent,
  LoaderWrapper,
  MonthAndYear,
  MonthAndYearWrapper,
  NoWorkoutsText,
  QuickInfoRow,
  RightCardContent,
  SearchWrapper,
  SVGWrapper,
  TrashIconWrapper,
  WorkoutCard,
  WorkoutDate,
  WorkoutName,
  WorkoutsWrapper,
  WorkoutWrapper,
} from "./styles";

interface WorkoutsProps {}

const AMOUNT_TO_ADD = 16;

const Workouts: React.FC<WorkoutsProps> = ({}) => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const [getUserWorkouts, { data: workoutsData }] =
    useGetUserWorkoutsLazyQuery();

  const [showModal, setShowModal] = useState(false);

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(AMOUNT_TO_ADD);
  // Data for Selecting time in Calendar Modal
  // Start date -> 1st day 3 months from today
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: getDateXMonthsBefore(new Date(), 3, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const searchFormik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: SearchSchema,
    onSubmit: () => {},
  });

  const handleScroll = (e: any) => {
    const top = e.target.scrollTop === 0;

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setEndSlice(prev => prev + AMOUNT_TO_ADD);
    }
  };

  const calculateVolume = (workout: Workout) => {
    let volume = 0;

    workout.workoutExercise.forEach(exercise => {
      exercise.exerciseSet.forEach(set => {
        volume = volume + set.reps * set.weight;
      });
    });

    return volume;
  };

  const handleSelectDates = () => {
    getUserWorkouts({
      variables: {
        startDate: moment(heatmapData[0].startDate).format("YYYY-MM-DD"),
        endDate: moment(heatmapData[0].endDate).format("YYYY-MM-DD"),
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchFormik.handleChange(e);
  };

  useEffect(() => {
    dispatch(navActions.changeItem(WORKOUTS));
  }, []);

  useEffect(() => {
    getUserWorkouts({
      variables: {
        startDate: moment(getDateXMonthsBefore(new Date(), 3, 1)).format(
          "YYYY MM DD",
        ),
        endDate: moment(new Date()).format("YYYY MM DD"),
      },
    });
  }, []);

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open} onScroll={handleScroll}>
        <ContentWrapper>
          <Heading size="h2" textAlign="left" padding="0">
            Workouts
          </Heading>
          <SearchWrapper>
            <InputWithIcon
              id="searchInput"
              error={searchFormik.errors.search}
              iconComp={<SearchIcon />}
              name="search"
              onChange={handleSearchChange}
              placeholder="Search"
              type="text"
              value={searchFormik.values.search}
              width="300px"
              margin="1em 1em 0 0"
            />
            <CalendarWrapper>
              <CalendarIcon
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </CalendarWrapper>
          </SearchWrapper>
          {!workoutsData && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          <WorkoutsWrapper onScroll={handleScroll}>
            {workoutsData?.getUserWorkouts
              ?.slice(startSlice, endSlice)
              .map((el, idx) => (
                <React.Fragment key={el.id}>
                  {idx === 0 ? (
                    <MonthAndYearWrapper>
                      <MonthAndYear>
                        {moment(el.updatedAt, "x").format("MMMM YYYY")}
                      </MonthAndYear>
                    </MonthAndYearWrapper>
                  ) : (
                    <>
                      {workoutsData &&
                        workoutsData.getUserWorkouts &&
                        isNewMonthTimeStamp(
                          workoutsData?.getUserWorkouts[idx - 1]?.createdAt,
                          workoutsData?.getUserWorkouts[idx]?.createdAt,
                        ) && (
                          <MonthAndYearWrapper>
                            <MonthAndYear>
                              {moment(el.updatedAt, "x").format("MMMM YYYY")}
                            </MonthAndYear>
                          </MonthAndYearWrapper>
                        )}
                    </>
                  )}
                  <WorkoutWrapper>
                    <WorkoutCard>
                      <LeftCardContent>
                        <WorkoutName>{el.name}</WorkoutName>
                        <WorkoutDate>
                          {moment(el.updatedAt, "x").format("DD MMMM - HH:MM")}
                        </WorkoutDate>
                        <QuickInfoRow>
                          <SVGWrapper>
                            <WeightIcon />
                            {calculateVolume(el as Workout)} kg
                          </SVGWrapper>
                        </QuickInfoRow>
                      </LeftCardContent>
                      <RightCardContent>
                        <ExerciseSVG>
                          <Model
                            highlightedColors={[
                              ...populateColorsForMuscleHeatmap(
                                getThemostTraineMuscleAmountFromWorkout(
                                  el as Workout,
                                ),
                                299,
                                180,
                                180,
                                8,
                              ),
                            ]}
                            data={[
                              {
                                name: "",
                                //@ts-ignore
                                muscles: getMusclesFromWorkout(el as Workout),
                              },
                            ]}
                          />

                          <Model
                            type="posterior"
                            highlightedColors={[
                              ...populateColorsForMuscleHeatmap(
                                getThemostTraineMuscleAmountFromWorkout(
                                  el as Workout,
                                ),
                                299,
                                180,
                                180,
                                8,
                              ),
                            ]}
                            data={[
                              {
                                name: "",
                                //@ts-ignore
                                muscles: getMusclesFromWorkout(el as Workout),
                              },
                            ]}
                          />
                        </ExerciseSVG>
                      </RightCardContent>
                      <TrashIconWrapper>
                        <TrashIcon />
                      </TrashIconWrapper>
                    </WorkoutCard>
                  </WorkoutWrapper>
                </React.Fragment>
              ))}
            {workoutsData &&
              workoutsData.getUserWorkouts &&
              workoutsData?.getUserWorkouts?.length <= 0 && (
                <NoWorkoutsText>
                  You have no exercises in this time period
                </NoWorkoutsText>
              )}
          </WorkoutsWrapper>
        </ContentWrapper>
      </RightContent>
      <DateRangePickerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        heatmapData={heatmapData}
        setHeatmapData={setHeatmapData}
        handleFinish={handleSelectDates}
      />
    </DashbordLayoutHOC>
  );
};
export default Workouts;
