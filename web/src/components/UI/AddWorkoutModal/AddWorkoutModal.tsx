import { useFormik } from "formik";
import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";
import {
  IExercise,
  MockedExercises,
  Muscle,
} from "../../../constants/exercises";
import { convertMuscleDBToNPMPackage } from "../../../utils/converters";
import { SearchSchema } from "../../../utils/formSchemas";
import { capitalizeFirstLetter } from "../../../utils/stringUtils";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import Model from "react-body-highlighter";
import Select from "../Select/Select";
import {
  AlphabetLetter,
  Exercise,
  ExerciseInfo,
  ExerciseName,
  ExercisePrimaryMuscle,
  ExerciseSVG,
  ExercisesWrapper,
  Form,
  Modal,
  TopSearchWrapper,
} from "./styles";

interface AddWorkoutModalProps {
  handleClose: () => void;
  show: boolean;
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  show,
  handleClose,
}) => {
  const [mockedExercises, setMockedExercises] = useState(MockedExercises);

  const searchFormik = useFormik({
    initialValues: {
      search: "",
      bodyCategory: "Any Body Category",
    },
    validationSchema: SearchSchema,
    onSubmit: () => {},
  });

  const displayFirtLetter = (exercise: IExercise, currIdx: number) => {
    const currFirstChar = exercise.name.charAt(0);

    if (currIdx === 0) {
      return <AlphabetLetter>{currFirstChar}</AlphabetLetter>;
    }

    const prevFirstChar = mockedExercises[currIdx - 1].name.charAt(0);

    if (currFirstChar !== prevFirstChar) {
      return <AlphabetLetter>{currFirstChar}</AlphabetLetter>;
    }

    return;
  };

  return (
    <Modal show={show} handleClose={handleClose}>
      <Form onSubmit={searchFormik.handleSubmit}>
        <TopSearchWrapper>
          <InputWithIcon
            id="searchInput"
            error={searchFormik.errors.search}
            iconComp={<SearchIcon />}
            name="search"
            onChange={searchFormik.handleChange}
            placeholder="Search"
            type="text"
            value={searchFormik.values.search}
            width="fit-content"
            margin="1em 1em 0 0"
          />
          <Select
            options={[...Object.values(Muscle)]}
            formik={searchFormik}
            name="bodyCategory"
          />
        </TopSearchWrapper>
        <ExercisesWrapper>
          {mockedExercises.map((exercise, idx) => (
            <>
              {/* @ts-ignore */}
              {displayFirtLetter(exercise, idx)}
              <Exercise>
                <ExerciseSVG>
                  <Model
                    data={convertMuscleDBToNPMPackage(exercise.primaryMuscles)}
                    highlightedColors={["#db2f2f"]}
                  />
                  <Model
                    type="posterior"
                    data={convertMuscleDBToNPMPackage(exercise.primaryMuscles)}
                    highlightedColors={["#db2f2f"]}
                  />
                </ExerciseSVG>
                <ExerciseInfo>
                  <ExerciseName>
                    {capitalizeFirstLetter(exercise.name)}
                  </ExerciseName>
                  <ExercisePrimaryMuscle>
                    {capitalizeFirstLetter(exercise.primaryMuscles[0])}
                  </ExercisePrimaryMuscle>
                </ExerciseInfo>
              </Exercise>
            </>
          ))}
        </ExercisesWrapper>
      </Form>
    </Modal>
  );
};
export default AddWorkoutModal;
