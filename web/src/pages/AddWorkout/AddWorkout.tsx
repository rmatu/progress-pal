import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexWrapperDiv } from "../../components/FlexElements";
import { Button, Heading } from "../../components/UI";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { AddWorkoutSchema } from "../../utils/formSchemas";
import { setDashboardItem } from "../../utils/setDashboardItem";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil.svg";

import { ButtonWrapper, WorkoutForm } from "./styles";
import theme from "../../theme/theme";
import { useHistory } from "react-router";
import { MAIN_PAGE } from "../../constants/routes";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import AddWorkoutModal from "../../components/UI/AddWorkoutModal/AddWorkoutModal";

const AddWorkout = () => {
  const { data: user } = useMeQuery();
  const [showAddExercisesModal, setShowAddExercisesModal] = useState(true);

  const { selectedItem, open } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const exerciseFormik = useFormik({
    initialValues: {
      exerciseName: moment().format(`[Workout] DD-MM-YYYY`),
    },
    validationSchema: AddWorkoutSchema,
    onSubmit: () => {},
  });

  const handleExerciseFormikOnChange = (e: any) => {
    exerciseFormik.handleChange(e);
  };

  const handleCancelWorkout = () => {
    history.push(MAIN_PAGE);
  };

  useEffect(() => {
    setDashboardItem(selectedItem, "add-workout", dispatch);
  }, [dispatch, selectedItem]);

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <WorkoutForm onSubmit={exerciseFormik.handleSubmit}>
          <Heading size="h2">Add Workout</Heading>
          <FlexWrapperDiv justifyContent="center">
            <InputWithIcon
              name="exerciseName"
              value={exerciseFormik.values.exerciseName}
              type="text"
              onChange={handleExerciseFormikOnChange}
              iconComp={<PencilIcon />}
              width="13em"
              error={exerciseFormik.errors.exerciseName}
            />
          </FlexWrapperDiv>
          <ButtonWrapper>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              onClick={() => setShowAddExercisesModal(true)}
              type="button"
            >
              Add Exercises
            </Button>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              bColor={theme.colors.errorTextColor}
              onClick={handleCancelWorkout}
              type="button"
            >
              Cancel Workout
            </Button>
          </ButtonWrapper>
        </WorkoutForm>
      </RightContent>
      {/* @ts-ignore */}
      {showAddExercisesModal && (
        <AddWorkoutModal
          show={showAddExercisesModal}
          handleClose={() => setShowAddExercisesModal(false)}
        />
      )}
    </DashbordLayoutHOC>
  );
};

export default AddWorkout;
