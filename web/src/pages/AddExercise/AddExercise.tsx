import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateUserExerciseMutation,
  useMeQuery,
} from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import Model from "react-body-highlighter";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import * as popupActions from "../../redux/popup/popupActions";
import { ReactComponent as ResetIcon } from "../../assets/svg/reset.svg";
import { ReactComponent as PlusIcon } from "../../assets/svg/plusCircle.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { ADD_EXERCISE } from "../../constants/routes";
import { Button, Heading, Popup } from "../../components/UI";
import {
  ButtonsWrapper,
  FormWrapper,
  ModelWrapper,
  BottomContentWrapper,
  RadioInput,
  Rectangle,
  Legend,
  LegendText,
  ResetIconWrapper,
  OptionalSpan,
  StepNumber,
  TrashIconWrapper,
  PlusIconWrapper,
  TextArea,
  AddInstructionButton,
} from "./styles";
import { useFormik } from "formik";
import { CreateExerciseSchema } from "../../utils/formSchemas";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import { FlexWrapperDiv } from "../../components/FlexElements";
import theme from "../../theme/theme";
import Select from "../../components/UI/Select/Select";
import {
  Category,
  Equipment,
  Force,
  Level,
  Mechanic,
} from "../../constants/exercises";
import { convertSVGNamesToDBNames } from "../../utils/converters";
import { createRefetchQueriesArray } from "../../utils/graphQLHelpers";

interface AddExerciseProps {}

const AddExercise: React.FC<AddExerciseProps> = () => {
  const { data: userData } = useMeQuery();
  const [createUserExercise, { loading }] = useCreateUserExerciseMutation({
    onCompleted: () => {
      dispatch(
        popupActions.setPopupVisibility({
          visibility: true,
          text: "Exercise created successfuly!",
          popupType: "success",
        }),
      );
      setTimeout(() => {
        dispatch(
          popupActions.setPopupVisibility({
            visibility: false,
            text: "Exercise created successfuly!",
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

  const [instructions, setInstructions] = useState<string[]>([""]);
  // ! FOR MANIPULATING THE MODEL
  const [dataForModel, setDataForModel] = useState<any>([]);

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const dispatch = useDispatch();

  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      force: "pull",
      mechanic: "compound",
      equipment: "body only",
      category: "strength",
      level: "beginner",
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

      createUserExercise({ variables });
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

  useEffect(() => {
    dispatch(navActions.changeItem(ADD_EXERCISE));
  }, []);

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <Heading size="h2" marginB="0.5em">
          Create your own exercise
        </Heading>
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
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
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
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
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
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
                        <TrashIcon
                          onClick={() => handleDeleteInstruction(idx)}
                        />
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
              Create
            </Button>
            <Button
              bColor={theme.colors.errorTextColor}
              fontSize="1rem"
              type="button"
            >
              Cancel
            </Button>
          </ButtonsWrapper>
        </FormWrapper>
      </RightContent>
      <Popup showPopup={show} error={popupType === "error"}>
        {text}
      </Popup>
    </DashbordLayoutHOC>
  );
};

export default AddExercise;
