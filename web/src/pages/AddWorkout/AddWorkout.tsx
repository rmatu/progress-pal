import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexWrapperDiv } from "../../components/FlexElements";
import { Button, Heading, Modal } from "../../components/UI";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { AddWorkoutSchema } from "../../utils/formSchemas";
import { setDashboardItem } from "../../utils/setDashboardItem";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil.svg";

import { ButtonWrapper, SVGWrapper, WorkoutForm, WorkoutName } from "./styles";
import theme from "../../theme/theme";
import { useHistory } from "react-router";
import { MAIN_PAGE } from "../../constants/routes";
import ModalScroll from "../../components/UI/ModalScroll/ModalScroll";

const AddWorkout = () => {
  const { data: user } = useMeQuery();
  const [showAddExercisesModal, setShowAddExercisesModal] = useState(false);
  const [years, setYears] = useState<number[]>([]);

  const { selectedItem, open } = useSelector(
    (state: AppState) => state.dashboardNavbar,
  );
  const exerciseNameInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      exerciseName: moment().format(`[Workout] DD-MM-YYYY`),
    },
    validationSchema: AddWorkoutSchema,
    onSubmit: () => {},
  });

  const handleFormikOnChange = (e: any) => {
    formik.handleChange(e);
  };

  const handleCancelWorkout = () => {
    history.push(MAIN_PAGE);
  };

  const handlePencilClick = () => {
    if (!exerciseNameInputRef || !exerciseNameInputRef.current) return;

    exerciseNameInputRef.current.focus();
    exerciseNameInputRef.current.select();
  };

  useEffect(() => {
    setDashboardItem(selectedItem, "add-workout", dispatch);
  }, [dispatch, selectedItem]);

  useEffect(() => {
    const newYears = [];
    for (let i = 0; i < 100; i++) {
      newYears.push(Number(moment().get("y")) - i);
    }
    setYears(newYears);
  }, []);

  return (
    <DashbordLayoutHOC user={user?.me}>
      <RightContent open={open}>
        <WorkoutForm onSubmit={formik.handleSubmit}>
          <Heading size="h2">Add Workout</Heading>
          <FlexWrapperDiv justifyContent="center">
            <FlexWrapperDiv
              margin="0.5em 0"
              backgroundColor={theme.colors.backgroundGray}
              borderRadius="0.5em"
              padding="0.4em 0.7em"
              width="fit-content"
            >
              <WorkoutName
                name="exerciseName"
                value={formik.values.exerciseName}
                type="text"
                onChange={handleFormikOnChange}
                ref={exerciseNameInputRef}
              />
              <SVGWrapper>
                <PencilIcon onClick={handlePencilClick} />
              </SVGWrapper>
            </FlexWrapperDiv>
          </FlexWrapperDiv>
          <ButtonWrapper>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              onClick={() => setShowAddExercisesModal(true)}
            >
              Add Exercises
            </Button>
            <Button
              marginTop="1em"
              padding="0.2em 2em"
              fontSize="1.125rem"
              bColor={theme.colors.errorTextColor}
              onClick={handleCancelWorkout}
            >
              Cancel Workout
            </Button>
          </ButtonWrapper>
        </WorkoutForm>
      </RightContent>
      {/* @ts-ignore */}
      {showAddExercisesModal && (
        <ModalScroll
          show={showAddExercisesModal}
          handleClose={() => setShowAddExercisesModal(false)}
        >
          {years.map(el => (
            <Heading size="h4">{el}</Heading>
          ))}
        </ModalScroll>
      )}
    </DashbordLayoutHOC>
  );
};

export default AddWorkout;
