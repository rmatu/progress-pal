import moment from "moment";
import React, { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { DateRangePicker } from "react-date-range";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import { useGetDataForMuscleHeatmapLazyQuery } from "../../../generated/graphql";
import {
  convertDataForMuscleHeatmap,
  getTheMostTrainedMuscleAmount,
} from "../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../utils/cssHelpers";
import Loader from "../Loader/Loader";
import ModalScroll from "../ModalScroll/ModalScroll";
import {
  CalendarWrapper,
  DateRangePickerWrapper,
  LoaderWrapper,
  ModelWrapper,
  Row,
  Text,
  Wrapper,
} from "./styles";
import { addDays, subDays } from "date-fns";
import theme from "../../../theme/theme";

interface MuscleHeatmapModelProps {}

const MuscleHeatmapModel: React.FC<MuscleHeatmapModelProps> = ({}) => {
  const [showModal, setShowModal] = useState(true);

  const [getDataForMuscleHeatmap, { data: dataForMuscleHeatmap }] =
    useGetDataForMuscleHeatmapLazyQuery();

  // 2 weeks of data for muscle heatmap
  const [startDate, setStartDate] = useState(
    moment().subtract(14, "days").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: subDays(new Date(), 14),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  console.log(heatmapData);

  useEffect(() => {
    const muscleHeatMapStartDate = moment()
      .subtract(14, "days")
      .format("YYYY-MM-DD");

    const muscleHeatMapEndDate = moment().format("YYYY-MM-DD");

    getDataForMuscleHeatmap({
      variables: {
        startDate: muscleHeatMapStartDate,
        endDate: muscleHeatMapEndDate,
      },
    });
  }, []);

  if (!dataForMuscleHeatmap) {
    return (
      <ModelWrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </ModelWrapper>
    );
  }

  return (
    <Wrapper>
      <ModelWrapper>
        <Model
          highlightedColors={[
            "rgb(229, 180, 180)",
            ...populateColorsForMuscleHeatmap(
              getTheMostTrainedMuscleAmount(
                dataForMuscleHeatmap?.getDataForMuscleHeatmap,
              ),
              299,
              180,
              180,
              8,
            ),
            "rgb(229, 8, 8)",
          ]}
          data={[
            {
              name: "",
              //@ts-ignore
              muscles: [
                ...convertDataForMuscleHeatmap(
                  dataForMuscleHeatmap?.getDataForMuscleHeatmap,
                ),
              ],
            },
          ]}
        />

        <Model
          type="posterior"
          highlightedColors={[
            "rgb(229, 180, 180)",
            ...populateColorsForMuscleHeatmap(
              getTheMostTrainedMuscleAmount(
                dataForMuscleHeatmap?.getDataForMuscleHeatmap,
              ),
              299,
              180,
              180,
              8,
            ),
            "rgb(229, 8, 8)",
          ]}
          data={[
            {
              name: "",
              //@ts-ignore
              muscles: [
                ...convertDataForMuscleHeatmap(
                  dataForMuscleHeatmap?.getDataForMuscleHeatmap,
                ),
              ],
            },
          ]}
        />
      </ModelWrapper>
      <Row>
        <Text>
          {moment(heatmapData[0].startDate).format("DD-MM-YYYY")} -{" "}
          {moment(heatmapData[0].endDate).format("DD-MM-YYYY")}
        </Text>
        <CalendarWrapper>
          <CalendarIcon
            onClick={() => {
              setShowModal(true);
            }}
          />
        </CalendarWrapper>
      </Row>
      <ModalScroll
        show={showModal}
        handleClose={() => setShowModal(false)}
        width={"fit-content"}
        minHeight={"570px"}
      >
        <DateRangePickerWrapper>
          <DateRangePicker
            //@ts-ignore
            onChange={item => setHeatmapData([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            maxDate={new Date()}
            ranges={heatmapData}
            direction="horizontal"
            rangeColors={[theme.colors.orange]}
          />
        </DateRangePickerWrapper>
      </ModalScroll>
    </Wrapper>
  );
};

export default MuscleHeatmapModel;
