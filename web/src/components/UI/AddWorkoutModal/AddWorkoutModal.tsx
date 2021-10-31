import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { Button } from "..";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";
import {
  IExercise,
  MockedExercises,
  Muscle,
} from "../../../constants/exercises";
import { useGetAllCommonExercisesQuery } from "../../../generated/graphql";
import { convertMuscleDBToNPMPackage } from "../../../utils/converters";
import { SearchSchema } from "../../../utils/formSchemas";
import {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
} from "../../../utils/stringUtils";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import Loader from "../Loader/Loader";
import ModalScroll from "../ModalScroll/ModalScroll";
import Select from "../Select/Select";
import { ReactComponent as HumanFrontSVG } from "../../../assets/svg/humanFront.svg";
import { ReactComponent as HumanBackSVG } from "../../../assets/svg/humanBack.svg";
import {
  AlphabetLetter,
  Exercise,
  ExerciseInfo,
  ExerciseName,
  ExercisePrimaryMuscle,
  ExercisesAmmount,
  ExerciseSVG,
  ExercisesWrapper,
  Form,
  NoExercises,
  LoaderWrapper,
  TopSearchWrapper,
} from "./styles";

interface AddWorkoutModalProps {
  handleClose: () => void;
  handleSelectedItem: (exercise: any) => void;
  minHeight?: string;
  selectedExercises: [];
  show: boolean;
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  handleClose,
  handleSelectedItem,
  minHeight,
  selectedExercises,
  show,
}) => {
  const { data: exercises, loading } = useGetAllCommonExercisesQuery();

  const [fetchedExercises, setFetchedExercises] = useState<any[]>([]);

  const searchFormik = useFormik({
    initialValues: {
      search: "",
      bodyCategory: "Any Body Category",
    },
    validationSchema: SearchSchema,
    onSubmit: () => {},
  });

  const displayFirtLetter = (exercise: IExercise, currIdx: number) => {
    if (!exercise) return;

    const currFirstChar = exercise.name.charAt(0);

    if (currIdx === 0) {
      return <AlphabetLetter>{currFirstChar}</AlphabetLetter>;
    }

    const prevFirstChar = fetchedExercises[currIdx - 1].name.charAt(0);

    if (currFirstChar !== prevFirstChar) {
      return <AlphabetLetter>{currFirstChar}</AlphabetLetter>;
    }

    return;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!exercises || !exercises.getAllCommonExercises) return;

    const bodyCategory = e.target.value;
    if (bodyCategory === "Any Body Category") {
      setFetchedExercises(exercises.getAllCommonExercises);
    } else {
      const filteredExercises = exercises.getAllCommonExercises.filter(el =>
        el.primaryMuscles.find(
          name => name === lowerCaseFirstLetter(bodyCategory),
        ),
      );
      setFetchedExercises(filteredExercises);
    }

    searchFormik.handleChange(e);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!exercises || !exercises.getAllCommonExercises) return;

    const userInput = e.target.value;

    if (!userInput) {
      setFetchedExercises(exercises.getAllCommonExercises);
    } else {
      const filteredExercises = exercises.getAllCommonExercises.filter(el =>
        el.name.toLowerCase().includes(userInput.toLowerCase()),
      );
      setFetchedExercises(filteredExercises);
    }

    searchFormik.handleChange(e);
  };

  useEffect(() => {
    if (exercises && exercises.getAllCommonExercises && !loading) {
      setFetchedExercises(exercises.getAllCommonExercises);
    }
  }, [exercises, loading]);

  console.log(fetchedExercises.length);

  if (loading && fetchedExercises.length === 0) {
    return (
      <ModalScroll show={show} handleClose={handleClose} minHeight={minHeight}>
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
              disabled={true}
            />
            <Select
              options={[...Object.values(Muscle)]}
              formik={searchFormik}
              handleSelectChange={handleSelectChange}
              name="bodyCategory"
              disabled={true}
            />
            <Button
              padding="0.2em 1.5em"
              fontSize="1.125rem"
              type="button"
              borderRadius="0.5em"
              disabled={true}
              onClick={handleClose}
            >
              Add
            </Button>
          </TopSearchWrapper>
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        </Form>
      </ModalScroll>
    );
  }

  return (
    <ModalScroll show={show} handleClose={handleClose} minHeight={minHeight}>
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
          <Button
            padding="0.2em 1.5em"
            fontSize="1.125rem"
            type="button"
            borderRadius="0.5em"
            onClick={handleClose}
          >
            Add
          </Button>
        </TopSearchWrapper>
        <ExercisesAmmount>
          Found {fetchedExercises.length} exercises
        </ExercisesAmmount>
        <ExercisesWrapper>
          {fetchedExercises.map((exercise, idx) => (
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
                  <HumanFrontSVG />
                  <HumanBackSVG />
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
    </ModalScroll>
  );
};
export default AddWorkoutModal;
