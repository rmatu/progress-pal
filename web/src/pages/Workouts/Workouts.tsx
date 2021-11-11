import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ReactComponent as CalendarIcon } from "../../assets/svg/calendar.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { Heading } from "../../components/UI";
import DateRangePickerModal from "../../components/UI/DateRangePickerModal/DateRangePickerModal";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import Loader from "../../components/UI/Loader/Loader";
import WorkoutsList from "../../components/UI/WorkoutsList/WorkoutsList";
import { WORKOUTS } from "../../constants/routes";
import {
  GetUserWorkoutsQuery,
  useGetUserWorkoutsLazyQuery,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { AppState } from "../../redux/rootReducer";
import { getDateXMonthsBefore } from "../../utils/dateHelpers";
import { SearchSchema } from "../../utils/formSchemas";
import {
  CalendarWrapper,
  ContentWrapper,
  LoaderWrapper,
  SearchWrapper,
} from "./styles";

interface WorkoutsProps {}

export const AMOUNT_WORKOUTS_TO_ADD = 16;

const Workouts: React.FC<WorkoutsProps> = ({}) => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  // https://medium.com/@galen.corey/understanding-apollo-fetch-policies-705b5ad71980
  const [getUserWorkouts, { data: workoutsData, loading: workoutsLoading }] =
    useGetUserWorkoutsLazyQuery({ fetchPolicy: "cache-and-network" });

  const [fetchedWorkouts, setFetchedWorkouts] =
    useState<GetUserWorkoutsQuery["getUserWorkouts"]>();

  const [showModal, setShowModal] = useState(false);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(AMOUNT_WORKOUTS_TO_ADD);

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

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

  const handleSelectDates = () => {
    getUserWorkouts({
      variables: {
        startDate: moment(heatmapData[0].startDate).format("YYYY-MM-DD"),
        endDate: moment(heatmapData[0].endDate).format("YYYY-MM-DD"),
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!workoutsData || !workoutsData.getUserWorkouts) return;

    setEndSlice(AMOUNT_WORKOUTS_TO_ADD);

    const userInput = e.target.value;

    if (!userInput) {
      setFetchedWorkouts(workoutsData.getUserWorkouts);
    } else {
      const filteredExercises = workoutsData.getUserWorkouts.filter(el =>
        el.name.toLowerCase().includes(userInput.toLowerCase()),
      );
      setFetchedWorkouts(filteredExercises);
    }

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

  useEffect(() => {
    if (workoutsData && workoutsData.getUserWorkouts) {
      setFetchedWorkouts(workoutsData.getUserWorkouts);
    }
  }, [workoutsData]);

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
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
          {!workoutsLoading && (
            <WorkoutsList
              workoutsData={fetchedWorkouts}
              startSlice={startSlice}
              endSlice={endSlice}
              setEndSlice={setEndSlice}
            />
          )}
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
