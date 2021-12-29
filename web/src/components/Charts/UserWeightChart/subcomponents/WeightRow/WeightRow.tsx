import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import {
  GetWieghtChartDataResponse,
  useDeleteWeightMutation,
  useUpdateWeightMutation,
} from "../../../../../generated/graphql";
import { WeightChartSchema } from "../../../../../utils/formSchemas";
import { FlexWrapperDiv } from "../../../../FlexElements";
import InputWithIcon from "../../../../UI/InputWithIcon/InputWithIcon";
import { ReactComponent as TrashIcon } from "../../../../../assets/svg/trash.svg";
import { ReactComponent as PencilIcon } from "../../../../../assets/svg/pencil.svg";
import { SVGWrapper, Wrapper, ButtonsWrapper } from "./styles";
import { Button } from "../../../../UI";
import theme from "../../../../../theme/theme";
import { useDispatch } from "react-redux";
import * as popupActions from "../../../../../redux/popup/popupActions";

interface WeightRowProps {
  data: GetWieghtChartDataResponse;
  getWeightChartData: any;
  heatmapData: any;
  setShowEditWeightModal: any;
}

const WeightRow: React.FC<WeightRowProps> = ({
  data,
  getWeightChartData,
  heatmapData,
  setShowEditWeightModal,
}) => {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const [updateWeight] = useUpdateWeightMutation({
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
          text: "Weight updated successfuly!",
          popupType: "success",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: "Weight updated!",
            popupType: "success",
          }),
        );
      }, 4000);
      setShowEditWeightModal(false);
    },
  });

  const [deleteWeight] = useDeleteWeightMutation({
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
          text: "Deleted successfuly!",
          popupType: "success",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: "Deleted successfuly!",
            popupType: "success",
          }),
        );
      }, 4000);
      setShowEditWeightModal(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      weight: data.weight,
      date: moment().format("DD-MM-YYYY"),
    },
    validationSchema: WeightChartSchema,
    onSubmit: ({ weight }) => {
      updateWeight({
        variables: {
          weight,
          weightId: data.id,
        },
      });
    },
  });

  const handleDeleteWeight = () => {
    deleteWeight({
      variables: {
        weightId: data.id,
      },
    });
  };

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <FlexWrapperDiv
        justifyContent="flex-start"
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
          title={`${moment(data.date, "DD-MM-YYYY").format("DD MMMM YYYY")}`}
          placeholder="in kilograms"
          disabled={disabled}
        />

        <SVGWrapper>
          <PencilIcon onClick={() => setDisabled(!disabled)} />
          <TrashIcon onClick={handleDeleteWeight} />
        </SVGWrapper>
      </FlexWrapperDiv>
      {!disabled && (
        <ButtonsWrapper>
          <Button
            bColor={theme.colors.successTextColor}
            fontSize="1rem"
            type="submit"
            disabled={!formik.isValid}
          >
            Save
          </Button>
        </ButtonsWrapper>
      )}
    </Wrapper>
  );
};
export default WeightRow;
