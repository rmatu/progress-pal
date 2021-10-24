import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import {
  IExercise,
  MockedExercises,
  Muscle,
} from "../../../constants/exercises";
import { convertMuscleDBToNPMPackage } from "../../../utils/converters";
import { SearchSchema } from "../../../utils/formSchemas";
import {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
} from "../../../utils/stringUtils";
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
  handleSelectedItem: (exercise: any) => void;
  handleClose: () => void;
  show: boolean;
  selectedExercises: [];
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  handleSelectedItem,
  show,
  selectedExercises,
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

  console.log(searchFormik.values);

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bodyCategory = e.target.value;
    if (bodyCategory === "Any Body Category") {
      setMockedExercises(MockedExercises);
    } else {
      const filteredExercises = MockedExercises.filter(el =>
        el.primaryMuscles.find(
          name => name === lowerCaseFirstLetter(bodyCategory),
        ),
      );
      setMockedExercises(filteredExercises);
    }

    searchFormik.handleChange(e);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    if (!userInput) {
      setMockedExercises(MockedExercises);
    } else {
      const filteredExercises = MockedExercises.filter(el =>
        el.name.toLowerCase().includes(userInput.toLowerCase()),
      );
      setMockedExercises(filteredExercises);
    }

    searchFormik.handleChange(e);
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
            onChange={handleSearchChange}
            placeholder="Search"
            type="text"
            value={searchFormik.values.search}
            width="fit-content"
            margin="1em 1em 0 0"
          />
          <Select
            options={[...Object.values(Muscle)]}
            formik={searchFormik}
            handleSelectChange={handleSelectChange}
            name="bodyCategory"
          />
        </TopSearchWrapper>
        <ExercisesWrapper>
          {mockedExercises.map((exercise, idx) => (
            <React.Fragment key={exercise.name}>
              {/* @ts-ignore */}
              {displayFirtLetter(exercise, idx)}
              <Exercise
                onClick={() => handleSelectedItem(exercise)}
                selected={
                  //@ts-ignore
                  !!selectedExercises.find(el => el.name === exercise.name)
                }
              >
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
                <GreenCheckmark id="checkmark" />
              </Exercise>
            </React.Fragment>
          ))}
        </ExercisesWrapper>
      </Form>
    </Modal>
  );
};
export default AddWorkoutModal;
