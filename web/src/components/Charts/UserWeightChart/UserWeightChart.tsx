import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import theme from "../../../theme/theme";
import { Button, Heading, Popup } from "../../UI";
import { getStrokeColor } from "../strokeColors";
import {
  ButtonsWrapper,
  CalendarWrapper,
  IconsWrapper,
  LoaderWrapper,
  WeightRowWrapper,
  ModalContent,
  Text,
  Wrapper,
} from "./styles";
import { ReactComponent as PencilIcon } from "../../../assets/svg/pencil.svg";
import { ReactComponent as AddIcon } from "../../../assets/svg/plusCircle.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import DateRangePickerModal from "../../UI/DateRangePickerModal/DateRangePickerModal";
import moment from "moment";
import { getDateXMonthsBefore } from "../../../utils/dateHelpers";
import {
  useAddNewWeightMutation,
  useGetWeightChartDataLazyQuery,
} from "../../../generated/graphql";
import Loader from "../../UI/Loader/Loader";
import ModalScroll from "../../UI/ModalScroll/ModalScroll";
import { useFormik } from "formik";
import InputWithIcon from "../../UI/InputWithIcon/InputWithIcon";
import { WeightChartSchema } from "../../../utils/formSchemas";
import { FlexWrapperDiv } from "../../FlexElements";
import CalendarWithTimeModal from "../../UI/CalendarWithTimeModal/CalendarWithTimeModal";
import { useDispatch, useSelector } from "react-redux";
import * as popupActions from "../../../redux/popup/popupActions";
import { AppState } from "../../../redux/rootReducer";
import WeightRow from "./subcomponents/WeightRow/WeightRow";

interface UserWeightChartProps {
  version?: "gradient" | "linear";
}

const UserWeightChart: React.FC<UserWeightChartProps> = ({ version }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAddNewWeightModal, setShowAddNewWeightModal] = useState(false);
  const [showEditWeightModal, setShowEditWeightModal] = useState(false);
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: getDateXMonthsBefore(new Date(), 3, 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();
  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );

  const [
    getWeightChartData,
    { data: weightChartData, loading: wieghtChartDataLoading },
  ] = useGetWeightChartDataLazyQuery();

  const [addNewWeight] = useAddNewWeightMutation({
    onCompleted: () => {
      getWeightChartData({
        variables: {
          startDate: heatmapData[0].startDate,
          endDate: new Date(),
        },
      });
      dispatch(
        popupActions.setPopupVisibility({
          visibility: true,
          text: "Added successfuly!",
          popupType: "success",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: "Added successfuly!",
            popupType: "success",
          }),
        );
      }, 4000);
    },
  });

  const formik = useFormik({
    initialValues: {
      weight: undefined,
      date: moment().format("DD-MM-YYYY"),
    },
    validationSchema: WeightChartSchema,
    onSubmit: ({ weight, date }) => {
      setShowAddNewWeightModal(false);
      addNewWeight({
        variables: {
          weight: Number(weight)!,
          date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
        },
      });
    },
  });

  const chartData = weightChartData?.getWeightChartData ?? [];

  const handleDateChange = (date: Date) => {
    formik.setFieldValue("date", moment(date).format("DD-MM-YYYY"));
  };

  const handleFinish = () => {
    getWeightChartData({
      variables: {
        startDate: heatmapData[0].startDate,
        endDate: heatmapData[0].endDate,
      },
    });
  };

  useEffect(() => {
    getWeightChartData({
      variables: {
        startDate: heatmapData[0].startDate,
        endDate: heatmapData[0].endDate,
      },
    });
  }, []);

  if (wieghtChartDataLoading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </Wrapper>
    );
  }

  const modals = () => {
    return (
      <>
        <ModalScroll
          show={showAddNewWeightModal}
          handleClose={() => setShowAddNewWeightModal(false)}
        >
          <ModalContent onSubmit={formik.handleSubmit}>
            <Heading size="h2" marginB="0.4em">
              Add New Weight
            </Heading>
            <FlexWrapperDiv
              justifyContent="center"
              alignItems="center"
              gap="0.8em"
            >
              <InputWithIcon
                name="weight"
                value={formik.values.weight}
                type="number"
                onChange={e => formik.handleChange(e)}
                width="100%"
                error={formik.errors.weight}
                title="Weight"
                placeholder="in kilograms"
              />
              <InputWithIcon
                name="date"
                value={formik.values.date}
                type="string"
                onChange={e => formik.handleChange(e)}
                width="100%"
                error={formik.errors.date}
                iconComp={<CalendarIcon />}
                title="Date"
                handleIconClick={() => setShowCalendarModal(true)}
              />
            </FlexWrapperDiv>
            <ButtonsWrapper>
              <Button
                bColor={theme.colors.successTextColor}
                fontSize="1rem"
                type="submit"
                disabled={!formik.isValid}
              >
                Add
              </Button>
              <Button
                bColor={theme.colors.errorTextColor}
                fontSize="1rem"
                type="button"
                onClick={() => setShowAddNewWeightModal(false)}
              >
                Cancel
              </Button>
            </ButtonsWrapper>
          </ModalContent>
          {showCalendarModal && (
            <CalendarWithTimeModal
              noTime
              setOnlyDate={handleDateChange}
              setDateWithTime={() => {}}
              opened={showCalendarModal}
              close={() => setShowCalendarModal(false)}
            />
          )}
        </ModalScroll>
        <ModalScroll
          show={showEditWeightModal}
          handleClose={() => setShowEditWeightModal(false)}
          width="380px"
        >
          <WeightRowWrapper>
            {chartData
              .slice(0)
              .reverse()
              .map(el => (
                <WeightRow data={el} key={el.id} />
              ))}
          </WeightRowWrapper>
        </ModalScroll>
      </>
    );
  };

  if (version === "gradient") {
    return (
      <Wrapper>
        <IconsWrapper>
          <PencilIcon onClick={() => setShowEditWeightModal(true)} />
          <AddIcon onClick={() => setShowAddNewWeightModal(true)} />
        </IconsWrapper>
        <Heading size="h3" marginB="0.5em">
          Body weight progress
        </Heading>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={getStrokeColor(6)}
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor={getStrokeColor(6)}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />

            <CartesianGrid
              vertical
              horizontal
              verticalFill={["#444444"]}
              fillOpacity={0.2}
            />
            <YAxis
              label={{
                value: "in kilograms",
                angle: -90,
                position: "insideLeft",
                fill: "#666",
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5em",
                padding: "0.5em 3em",
                backgroundColor: theme.colors.backgroundGray,
                borderColor: theme.colors.grayText,
                fontWeight: "bolder",
              }}
              labelStyle={{
                display: "flex",
                alignSelf: "start",
                order: 1,
                textAlign: "center",
                fontSize: "1.75rem",
              }}
              formatter={(value: number) => {
                return [`${value} kg`, `Weight`];
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke={getStrokeColor(6)}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <CalendarWrapper onClick={() => setShowModal(true)}>
          <Text>
            {moment(heatmapData[0].startDate).format("DD MMM YYYY")} -{" "}
            {moment(heatmapData[0].endDate).format("DD MMM YYYY")}
          </Text>
          <CalendarIcon />
        </CalendarWrapper>
        <DateRangePickerModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          heatmapData={heatmapData}
          setHeatmapData={setHeatmapData}
          handleFinish={handleFinish}
        />
        {modals()}
        <Popup showPopup={show} error={popupType === "error"}>
          {text}
        </Popup>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <IconsWrapper>
        <PencilIcon onClick={() => setShowEditWeightModal(true)} />
        <AddIcon onClick={() => setShowAddNewWeightModal(true)} />
      </IconsWrapper>
      <Heading size="h3" marginB="0.5em">
        Your weight progress
      </Heading>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <CartesianGrid
            vertical
            horizontal
            verticalFill={["#444444"]}
            fillOpacity={0.2}
          />
          <YAxis
            label={{
              value: "in kilograms",
              angle: -90,
              position: "insideLeft",
              fill: "#666",
            }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={getStrokeColor(6)}
            strokeWidth={3}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5em",
              padding: "0.5em 3em",
              backgroundColor: theme.colors.backgroundGray,
              borderColor: theme.colors.grayText,
              fontWeight: "bolder",
            }}
            labelStyle={{
              display: "flex",
              alignSelf: "start",
              order: 1,
              textAlign: "center",
              fontSize: "1.75rem",
            }}
            formatter={(value: number) => {
              return [`${value} kg`, `Weight`];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <CalendarWrapper onClick={() => setShowModal(true)}>
        <Text>
          {moment(heatmapData[0].startDate).format("DD-MM-YYYY")} -{" "}
          {moment(heatmapData[0].endDate).format("DD-MM-YYYY")}
        </Text>
        <CalendarIcon />
      </CalendarWrapper>
      <DateRangePickerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        heatmapData={heatmapData}
        setHeatmapData={setHeatmapData}
        handleFinish={handleFinish}
      />
      {modals()}
      <Popup showPopup={show} error={popupType === "error"}>
        {text}
      </Popup>
    </Wrapper>
  );
};
export default UserWeightChart;
