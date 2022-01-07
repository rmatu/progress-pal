import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexWrapperDiv } from "../../../../../components/FlexElements";
import InputWithIcon from "../../../../../components/UI/InputWithIcon/InputWithIcon";
import Select from "../../../../../components/UI/Select/Select";
import * as popupActions from "../../../../../redux/popup/popupActions";
import * as modalActions from "../../../../../redux/modal/modalActions";
import Model from "react-body-highlighter";
import {
  Category,
  Equipment,
  Force,
  Level,
  Mechanic,
} from "../../../../../constants/exercises";
import {
  GetExerciseInfoQuery,
  useDeleteUserExerciseMutation,
  useUpdateUserExerciseMutation,
} from "../../../../../generated/graphql";
import { AppState } from "../../../../../redux/rootReducer";
import { CreateExerciseSchema } from "../../../../../utils/formSchemas";
import { createRefetchQueriesArray } from "../../../../../utils/graphQLHelpers";
import { ReactComponent as ResetIcon } from "../../../../../assets/svg/reset.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/svg/plusCircle.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/svg/trash.svg";
import {
  AddInstructionButton,
  BottomContentWrapper,
  ButtonsWrapper,
  FormWrapper,
  Legend,
  LegendText,
  ModelWrapper,
  OptionalSpan,
  PlusIconWrapper,
  RadioInput,
  Rectangle,
  ResetIconWrapper,
  StepNumber,
  TextArea,
  TrashIconWrapper,
} from "../../../../AddExercise/styles";
import {} from "./styles";
import { useFormik } from "formik";
import {
  convertMuscleNamesForExercisePage,
  convertSVGNamesToDBNames,
} from "../../../../../utils/converters";
import theme from "../../../../../theme/theme";
import { Button, Heading, Modal, Popup } from "../../../../../components/UI";
import { EditButtonsWrapper } from "../../../../../components/ExerciseSetsFromDB/styles";
import { useHistory } from "react-router-dom";
import { MAIN_PAGE } from "../../../../../constants/routes";

interface UserExerciseProps {
  exercise: GetExerciseInfoQuery["getExerciseInfo"];
}

const populateModelMusclesArr = (
  exercise: GetExerciseInfoQuery["getExerciseInfo"],
) => {
  const primary = convertMuscleNamesForExercisePage(
    exercise.primaryMuscles,
    "primaryMuscle",
  );
  const secondary = convertMuscleNamesForExercisePage(
    exercise.secondaryMuscles,
    "secondaryMuscle",
  );

  return [...primary, ...secondary];
};

const UserExercise: React.FC<UserExerciseProps> = ({ exercise }) => {
  const { show: showModal } = useSelector((state: AppState) => state.modal);
  const [deleteUserExerciseMutation, { loading: deleteLoading }] =
    useDeleteUserExerciseMutation({
      onCompleted: () => {
        history.push(MAIN_PAGE);
      },
      refetchQueries: createRefetchQueriesArray([
        "getAllCommonExercises",
        "getDataForMuscleHeatmap",
        "getUserLastWorkout",
        "getUserWorkout",
        "getUserWorkouts",
        "getUserYearlyWorkout",
        "getWeightChartData",
      ]),
    });
  const [updateUserExercise, { loading }] = useUpdateUserExerciseMutation({
    onCompleted: () => {
      dispatch(
        popupActions.setPopupVisibility({
          visibility: true,
          text: "Exercise updated successfuly!",
          popupType: "success",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: "Exercise updated successfuly!",
            popupType: "success",
          }),
        );
      }, 4000);
    },
    refetchQueries: createRefetchQueriesArray(["getAllCommonExercises"]),
  });

  const [selectedMuscle, setSelectedMuscle] = useState<
    "primaryMuscle" | "secondaryMuscle"
  >("primaryMuscle");

  const [instructions, setInstructions] = useState<string[]>(
    exercise?.instructions ?? [""],
  );
  // ! FOR MANIPULATING THE MODEL
  const [dataForModel, setDataForModel] = useState<any>([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );

  const formik = useFormik({
    initialValues: {
      name: exercise.name,
      force: exercise.force,
      mechanic: exercise.mechanic,
      equipment: exercise.equipment,
      category: exercise.category,
      level: exercise.level,
    },
    validationSchema: CreateExerciseSchema,
    onSubmit: values => {
      const primaryMuscles: string[] = [];
      const secondaryMuscles: string[] = [];

      dataForModel.forEach((el: any) => {
        if (el.type === "primaryMuscle") {
          primaryMuscles.push(el.name);
        } else {
          secondaryMuscles.push(el.name);
        }
      });

      const variables: any = {
        input: {
          ...values,
          primaryMuscles: convertSVGNamesToDBNames(primaryMuscles),
          exerciseId: exercise.id,
        },
      };

      if (secondaryMuscles.length) {
        variables.input.secondaryMuscles =
          convertSVGNamesToDBNames(secondaryMuscles);
      }

      if (instructions.length) {
        if (instructions[0] !== "") {
          variables.input.instructions = instructions;
        }
      }

      updateUserExercise({ variables });
    },
  });

  const checkIfUserSelectedPrimaryMuscles = () => {
    const primaryMuscles: string[] = [];

    dataForModel.forEach((el: any) => {
      if (el.type === "primaryMuscle") {
        primaryMuscles.push(el.name);
      }
    });

    return !!primaryMuscles.length;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  const handleMuscleClick = (e: any) => {
    const { muscle } = e;

    if (muscle === "knees" || muscle === "head") return;

    // Check if this muscle was ever selected
    const idx = dataForModel.findIndex((el: any) => el.name === muscle);

    // User clicked the same muscle again
    if (idx >= 0) {
      if (
        dataForModel[idx].muscles.length === 1 &&
        selectedMuscle === "primaryMuscle"
      ) {
        const newArr = dataForModel.filter((el: any) => el.name !== muscle);
        setDataForModel(newArr);
      }

      if (
        dataForModel[idx].muscles.length === 1 &&
        selectedMuscle === "secondaryMuscle"
      ) {
        const newArr = dataForModel.filter((el: any) => el.name !== muscle);

        newArr.push({
          name: muscle,
          type: selectedMuscle,
          muscles: [muscle, muscle],
        });
        setDataForModel(newArr);
      }

      if (
        dataForModel[idx].muscles.length === 2 &&
        selectedMuscle === "secondaryMuscle"
      ) {
        const newArr = dataForModel.filter((el: any) => el.name !== muscle);
        setDataForModel(newArr);
      }

      if (
        dataForModel[idx].muscles.length === 2 &&
        selectedMuscle === "primaryMuscle"
      ) {
        const newArr = dataForModel.filter((el: any) => el.name !== muscle);

        newArr.push({
          name: muscle,
          type: selectedMuscle,
          muscles: [muscle],
        });
        setDataForModel(newArr);
      }
    } else {
      // This muscle was never selected
      const variablesToAdd: { name: string; muscles?: string[]; type: string } =
        {
          name: muscle,
          type: selectedMuscle,
        };

      if (selectedMuscle === "primaryMuscle") {
        variablesToAdd.muscles = [muscle];
      } else {
        variablesToAdd.muscles = [muscle, muscle];
      }

      setDataForModel([...dataForModel, variablesToAdd]);
    }
  };

  const handleResetModels = () => {
    setDataForModel([]);
  };

  const handleInstructionChange = (e: any, idx: number) => {
    const newInstructions = [...instructions];
    newInstructions[idx] = e.target.value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleDeleteInstruction = (idx: number) => {
    if (idx === 0) {
      setInstructions([...instructions].slice(1, instructions.length));
      return;
    }

    const newArr = [...instructions];
    const leftPart = newArr.splice(0, idx);
    const updatedArr = [...leftPart, ...newArr.splice(idx, newArr.length)];
    setInstructions(updatedArr);
  };

  const handleDeleteExercise = () => {
    deleteUserExerciseMutation({
      variables: {
        exerciseId: exercise.id,
      },
    });
  };

  const handleModalClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleOpenModal = () => {
    dispatch(modalActions.openModal());
  };

  useEffect(() => {
    setDataForModel(populateModelMusclesArr(exercise));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(modalActions.closeModal());
    };
  }, []);

  return (
    <>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <FlexWrapperDiv justifyContent="center" alignItems="center" gap="0.8em">
          <InputWithIcon
            name="name"
            value={formik.values.name}
            type="text"
            onChange={e => formik.handleChange(e)}
            width="330px"
            error={formik.errors.name}
            title="Name"
          />
        </FlexWrapperDiv>
        <FlexWrapperDiv justifyContent="center" alignItems="center" gap="0.8em">
          <Select
            options={[...Object.values(Level)]}
            formik={formik}
            handleSelectChange={handleSelectChange}
            name="level"
            title="Level"
            margin="0 0 1em 0"
            width="170px"
          />
          <Select
            options={[...Object.values(Category)]}
            formik={formik}
            handleSelectChange={handleSelectChange}
            name="category"
            title="Category"
            margin="0 0 1em 0"
            width="170px"
          />
        </FlexWrapperDiv>
        <FlexWrapperDiv justifyContent="center" alignItems="center" gap="0.8em">
          <Select
            options={[...Object.values(Mechanic)]}
            formik={formik}
            handleSelectChange={handleSelectChange}
            name="mechanic"
            title="Mechanic"
            margin="0 0 1em 0"
            width="170px"
          />
          <Select
            options={[...Object.values(Force)]}
            formik={formik}
            handleSelectChange={handleSelectChange}
            name="force"
            title="Force"
            margin="0 0 1em 0"
            width="170px"
          />
        </FlexWrapperDiv>
        <FlexWrapperDiv
          justifyContent="center"
          alignItems="center"
          gap="0.8em"
          margin="0 0 2em 0"
          flexDirection="column"
        >
          <Select
            options={[...Object.values(Equipment)]}
            formik={formik}
            handleSelectChange={handleSelectChange}
            name="equipment"
            title="Equipment"
            margin="0 0 1em 0"
            width="350px"
          />
        </FlexWrapperDiv>
        <FlexWrapperDiv
          justifyContent="center"
          alignItems="center"
          gap="0.8em"
          margin="0 0 2em 0"
          flexDirection="column"
        >
          <BottomContentWrapper>
            <Legend>
              <RadioInput
                type="radio"
                checked={selectedMuscle === "primaryMuscle"}
                onChange={() => setSelectedMuscle("primaryMuscle")}
              />
              <LegendText>Primary Muscles</LegendText>
              <Rectangle color={theme.colors.modelPrimaryMuslces} />
              <RadioInput
                type="radio"
                checked={selectedMuscle === "secondaryMuscle"}
                onChange={() => setSelectedMuscle("secondaryMuscle")}
              />
              <LegendText>Secondary Muscles</LegendText>
              <Rectangle color={theme.colors.modelSecondaryMuscles} />
            </Legend>
            <ModelWrapper>
              <Model
                highlightedColors={[
                  theme.colors.modelPrimaryMuslces,
                  theme.colors.modelSecondaryMuscles,
                ]}
                //@ts-ignore
                data={dataForModel}
                onClick={handleMuscleClick}
              />
              <Model
                highlightedColors={[
                  theme.colors.modelPrimaryMuslces,
                  theme.colors.modelSecondaryMuscles,
                ]}
                //@ts-ignore
                data={dataForModel}
                onClick={handleMuscleClick}
                type="posterior"
              />
              <ResetIconWrapper>
                <ResetIcon onClick={handleResetModels} />
              </ResetIconWrapper>
            </ModelWrapper>

            <FlexWrapperDiv
              justifyContent="center"
              alignItems="flex-start"
              gap="0.8em"
              margin="2em 0 1em 0"
              flexDirection="column"
            >
              <Heading size="h3">
                Instructions <OptionalSpan>(optional)</OptionalSpan>
              </Heading>
              {!instructions.length ? (
                <AddInstructionButton>
                  <Button onClick={handleAddInstruction}>
                    Add new Instruction
                  </Button>
                </AddInstructionButton>
              ) : (
                instructions.map((instruction, idx) => (
                  <FlexWrapperDiv
                    key={idx}
                    justifyContent="center"
                    alignItems="center"
                    gap="0.8em"
                    margin="0.5em  0"
                    flexDirection="row"
                  >
                    <StepNumber>{idx + 1}</StepNumber>
                    <TextArea
                      value={instruction}
                      onChange={e => handleInstructionChange(e, idx)}
                    />
                    <TrashIconWrapper>
                      <TrashIcon onClick={() => handleDeleteInstruction(idx)} />
                    </TrashIconWrapper>
                  </FlexWrapperDiv>
                ))
              )}
            </FlexWrapperDiv>
            {!instructions.length ? null : (
              <PlusIconWrapper>
                <PlusIcon onClick={handleAddInstruction} />
              </PlusIconWrapper>
            )}
          </BottomContentWrapper>
        </FlexWrapperDiv>
        <ButtonsWrapper>
          <Button
            bColor={theme.colors.successTextColor}
            fontSize="1rem"
            type="submit"
            loading={loading && "Adding..."}
            disabled={
              !formik.isValid ||
              !formik.values.name ||
              !checkIfUserSelectedPrimaryMuscles()
            }
          >
            Update
          </Button>
          <Button
            bColor={theme.colors.errorTextColor}
            fontSize="1rem"
            type="button"
            onClick={handleOpenModal}
            loading={deleteLoading && "Deleting..."}
          >
            Delete
          </Button>
        </ButtonsWrapper>
      </FormWrapper>

      <Modal opened={showModal} close={handleModalClose} maxWidth={"40em"}>
        <Heading size="h4">
          Are you sure you want to delete this exercise?
        </Heading>
        <EditButtonsWrapper>
          <Button
            bColor={theme.colors.successTextColor}
            fontSize="1rem"
            type="button"
            onClick={handleDeleteExercise}
          >
            Delete
          </Button>
          <Button
            bColor={theme.colors.errorTextColor}
            fontSize="1rem"
            type="button"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </EditButtonsWrapper>
      </Modal>

      <Popup showPopup={show} error={popupType === "error"}>
        {text}
      </Popup>
    </>
  );
};
export default UserExercise;
