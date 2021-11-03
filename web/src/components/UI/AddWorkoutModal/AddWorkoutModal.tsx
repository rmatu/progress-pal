import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "..";
import { ReactComponent as GreenCheckmark } from "../../../assets/svg/green-checkmark.svg";
import { ReactComponent as HumanBackSVG } from "../../../assets/svg/humanBack.svg";
import { ReactComponent as HumanFrontSVG } from "../../../assets/svg/humanFront.svg";
import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";
import { IExercise, Muscle } from "../../../constants/exercises";
import { useGetAllCommonExercisesQuery } from "../../../generated/graphql";
import theme from "../../../theme/theme";
import {
  convertMusclesToSVGNames,
  sanitazeMuscleNameFromDB,
  unsanitazeMuscleNameFromDB,
} from "../../../utils/converters";
import { SearchSchema } from "../../../utils/formSchemas";
import {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
} from "../../../utils/stringUtils";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import Loader from "../Loader/Loader";
import ModalScroll from "../ModalScroll/ModalScroll";
import Select from "../Select/Select";
import {
  AlphabetLetter,
  Circle,
  Exercise,
  ExerciseInfo,
  ExerciseName,
  ExercisePrimaryMuscle,
  ExercisesAmmount,
  ExerciseSVG,
  ExercisesWrapper,
  Form,
  Legend,
  LegendText,
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

const AMOUNT_TO_ADD = 25;

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  handleClose,
  handleSelectedItem,
  minHeight,
  selectedExercises,
  show,
}) => {
  const { data: exercises, loading } = useGetAllCommonExercisesQuery();

  const [fetchedExercises, setFetchedExercises] = useState<any[]>([]);
  const [finishedLoadingData, setFinishedLoadingData] = useState(false);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(AMOUNT_TO_ADD);

  const searchFormik = useFormik({
    initialValues: {
      search: "",
      bodyCategory: "Any Body Category",
    },
    validationSchema: SearchSchema,
    onSubmit: () => {},
  });

  const handleScroll = (e: any) => {
    const top = e.target.scrollTop === 0;

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      setEndSlice(prev => prev + AMOUNT_TO_ADD);
    }
  };

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

    setEndSlice(AMOUNT_TO_ADD);
    const bodyCategory = e.target.value;
    if (bodyCategory === "Any Body Category") {
      setFetchedExercises(exercises.getAllCommonExercises);
    } else {
      const filteredExercises = exercises.getAllCommonExercises.filter(el =>
        el.primaryMuscles.find(
          name =>
            name ===
            lowerCaseFirstLetter(unsanitazeMuscleNameFromDB([bodyCategory])),
        ),
      );
      setFetchedExercises(filteredExercises);
    }

    searchFormik.handleChange(e);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!exercises || !exercises.getAllCommonExercises) return;

    setEndSlice(AMOUNT_TO_ADD);
    setFinishedLoadingData(false);
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

    setFinishedLoadingData(true);

    searchFormik.handleChange(e);
  };

  useEffect(() => {
    if (exercises && exercises.getAllCommonExercises && !loading) {
      setFetchedExercises(exercises.getAllCommonExercises);
      setFinishedLoadingData(true);
    }
  }, [exercises, loading]);

  if ((loading || fetchedExercises.length === 0) && !finishedLoadingData) {
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
          <Legend>
            <Circle color={theme.colors.modelPrimaryMuslces} />
            <LegendText>Primary Muscles</LegendText>
            <Circle color={theme.colors.modelSecondaryMuscles} />
            <LegendText>Secondary Muscles</LegendText>
          </Legend>
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
        <Legend>
          <Circle color={theme.colors.modelPrimaryMuslces} />
          <LegendText>Primary Muscles</LegendText>
          <Circle color={theme.colors.modelSecondaryMuscles} />
          <LegendText>Secondary Muscles</LegendText>
        </Legend>
        <ExercisesAmmount>
          Found {fetchedExercises.length} exercises
        </ExercisesAmmount>

        <ExercisesWrapper onScroll={handleScroll}>
          {fetchedExercises.slice(startSlice, endSlice).map((exercise, idx) => (
            <React.Fragment key={exercise.name}>
              {displayFirtLetter(exercise, idx)}
              <Exercise
                onClick={() => handleSelectedItem(exercise)}
                selected={
                  !!selectedExercises.find(
                    (el: any) => el.name === exercise.name,
                  )
                }
              >
                <ExerciseSVG
                  muscles={convertMusclesToSVGNames(exercise.primaryMuscles)}
                  secondaryMuscles={convertMusclesToSVGNames(
                    exercise.secondaryMuscles,
                  )}
                >
                  <HumanFrontSVG />
                  <HumanBackSVG />
                </ExerciseSVG>
                <ExerciseInfo>
                  <ExerciseName>
                    {capitalizeFirstLetter(exercise.name)}
                  </ExerciseName>
                  <ExercisePrimaryMuscle>
                    {capitalizeFirstLetter(
                      sanitazeMuscleNameFromDB(exercise.primaryMuscles),
                    )}
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
