import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { GetWieghtChartDataResponse } from "../../../../../generated/graphql";
import { WeightChartSchema } from "../../../../../utils/formSchemas";
import { FlexWrapperDiv } from "../../../../FlexElements";
import InputWithIcon from "../../../../UI/InputWithIcon/InputWithIcon";
import { ReactComponent as TrashIcon } from "../../../../../assets/svg/trash.svg";
import { ReactComponent as PencilIcon } from "../../../../../assets/svg/pencil.svg";
import { SVGWrapper, Wrapper, ButtonsWrapper } from "./styles";
import { Button } from "../../../../UI";
import theme from "../../../../../theme/theme";

interface WeightRowProps {
  data: GetWieghtChartDataResponse;
}

const WeightRow: React.FC<WeightRowProps> = ({ data }) => {
  const [disabled, setDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      weight: data.weight,
      date: moment().format("DD-MM-YYYY"),
    },
    validationSchema: WeightChartSchema,
    onSubmit: ({}) => {},
  });

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
          <TrashIcon />
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
