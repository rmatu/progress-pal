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
import { WORKOUTS } from "../../constants/routes";
import {
  useGetUserWorkoutsLazyQuery,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { AppState } from "../../redux/rootReducer";
import {
  getDateXMonthsBefore,
  isNewMonthTimeStamp,
} from "../../utils/dateHelpers";
import { SearchSchema } from "../../utils/formSchemas";
import {
  ContentWrapper,
  CalendarWrapper,
  SearchWrapper,
  MonthAndYear,
  WorkoutsWrapper,
  WorkoutWrapper,
  MonthAndYearWrapper,
  WorkoutCard,
  WorkoutName,
  WorkoutDate,
  LoaderWrapper,
  NoWorkoutsText,
} from "./styles";

interface WorkoutsProps {}

const AMOUNT_TO_ADD = 16;

const Workouts: React.FC<WorkoutsProps> = ({}) => {
  const { data: user } = useMeQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const [getUserWorkouts, { data: workoutsData }] =
    useGetUserWorkoutsLazyQuery();

  console.log(workoutsData);

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
                      <WorkoutName>{el.name}</WorkoutName>
                      <WorkoutDate>
                        {moment(el.updatedAt, "x").format("DD MMMM - HH:MM")}
                      </WorkoutDate>
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
