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

const Workouts: React.FC<WorkoutsProps> = ({}) => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const [getUserWorkouts, { data: workoutsData }] =
    useGetUserWorkoutsLazyQuery();

  const [showModal, setShowModal] = useState(false);

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
          <WorkoutsList workoutsData={workoutsData} />
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
