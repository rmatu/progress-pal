import { subDays } from "date-fns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import { useGetDataForMuscleHeatmapLazyQuery } from "../../../generated/graphql";
import {
  convertDataForMuscleHeatmap,
  getTheMostTrainedMuscleAmount,
} from "../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../utils/cssHelpers";
import DateRangePickerModal from "../DateRangePickerModal/DateRangePickerModal";
import Loader from "../Loader/Loader";
import {
  CalendarWrapper,
  LoaderWrapper,
  ModelWrapper,
  Row,
  Text,
  Wrapper,
} from "./styles";

interface MuscleHeatmapModelProps {}

const MuscleHeatmapModel: React.FC<MuscleHeatmapModelProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);

  const [getDataForMuscleHeatmap, { data: dataForMuscleHeatmap }] =
    useGetDataForMuscleHeatmapLazyQuery();

  // Data for muscle heatmap
  const [heatmapData, setHeatmapData] = useState([
    {
      startDate: subDays(new Date(), 14),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFinish = () => {
    getDataForMuscleHeatmap({
      variables: {
        startDate: moment(heatmapData[0].startDate).format("YYYY-MM-DD"),
        endDate: moment(heatmapData[0].endDate).format("YYYY-MM-DD"),
      },
    });
  };

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
            ...populateColorsForMuscleHeatmap(
              getTheMostTrainedMuscleAmount(
                dataForMuscleHeatmap?.getDataForMuscleHeatmap,
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
            ...populateColorsForMuscleHeatmap(
              getTheMostTrainedMuscleAmount(
                dataForMuscleHeatmap?.getDataForMuscleHeatmap,
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
          {moment(heatmapData[0].startDate).format("DD MMM YYYY")} -{" "}
          {moment(heatmapData[0].endDate).format("DD MMM YYYY")}
        </Text>
        <CalendarWrapper>
          <CalendarIcon
            onClick={() => {
              setShowModal(true);
            }}
          />
        </CalendarWrapper>
      </Row>
      <DateRangePickerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        heatmapData={heatmapData}
        setHeatmapData={setHeatmapData}
        handleFinish={handleFinish}
      />
    </Wrapper>
  );
};

export default MuscleHeatmapModel;
