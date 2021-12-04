import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EXERCISE } from "../../constants/routes";
import { useMeQuery } from "../../generated/graphql";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { ContentWrapper } from "./styles";
import { Heading } from "../../components/UI";
import AddWorkoutModal from "../../components/UI/AddWorkoutModal/AddWorkoutModal";
import ExerciseInstructionModal from "../../components/UI/WorkoutInstructionModal/ExerciseInstructionModal";

interface ExercisesProps {}

const Exercises: React.FC<ExercisesProps> = ({}) => {
  const { data: userData } = useMeQuery();
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const dispatch = useDispatch();
  const [selectedExercise, setSelectedExercise] = useState();
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleOpenInfoModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setOpenInfoModal(true);
  };

  useEffect(() => {
    dispatch(navActions.changeItem(EXERCISE));
  }, []);

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <ContentWrapper>
          <Heading size="h2" textAlign="left" padding="0">
            Exercises
          </Heading>
          <AddWorkoutModal
            noModal
            show={true}
            handleClose={() => {}}
            handleSelectedItem={() => {}}
            handleOpenInfoModal={handleOpenInfoModal}
            selectedExercises={[]}
          />
        </ContentWrapper>
      </RightContent>
      {openInfoModal && selectedExercise && (
        <ExerciseInstructionModal
          opened={openInfoModal}
          exactExercise={selectedExercise}
          close={() => setOpenInfoModal(false)}
        />
      )}
    </DashbordLayoutHOC>
  );
};
export default Exercises;
