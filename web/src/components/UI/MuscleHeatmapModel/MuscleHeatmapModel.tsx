import moment from "moment";
import React from "react";
import Model from "react-body-highlighter";
import { GetDataForMuscleHeatmapQuery } from "../../../generated/graphql";
import {
  convertDataForMuscleHeatmap,
  getTheMostTrainedMuscleAmount,
} from "../../../utils/converters";
import { populateColorsForMuscleHeatmap } from "../../../utils/cssHelpers";
import Loader from "../Loader/Loader";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import {
  CalendarWrapper,
  LoaderWrapper,
  ModelWrapper,
  Row,
  Text,
  Wrapper,
} from "./styles";

interface MuscleHeatmapModelProps {
  dataForMuscleHeatmap: GetDataForMuscleHeatmapQuery | undefined;
  startDate: string;
  endDate: string;
}

const MuscleHeatmapModel: React.FC<MuscleHeatmapModelProps> = ({
  dataForMuscleHeatmap,
  startDate,
  endDate,
}) => {
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
          {moment(startDate).format("DD-MM-YYYY")} -{" "}
          {moment(endDate).format("DD-MM-YYYY")}
        </Text>
        <CalendarWrapper>
          <CalendarIcon onClick={() => {}} />
        </CalendarWrapper>
      </Row>
    </Wrapper>
  );
};

export default MuscleHeatmapModel;
