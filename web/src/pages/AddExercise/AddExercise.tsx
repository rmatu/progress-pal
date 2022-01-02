import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import Model from "react-body-highlighter";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { ReactComponent as ResetIcon } from "../../assets/svg/reset.svg";
import { ADD_EXERCISE } from "../../constants/routes";
import { Button, Heading } from "../../components/UI";
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

interface AddExerciseProps {}

const AddExercise: React.FC<AddExerciseProps> = () => {
  const { data: userData } = useMeQuery();
  const [selectedMuscle, setSelectedMuscle] = useState<
    "primaryMuscle" | "secondaryMuscle"
  >("primaryMuscle");

  // ! FOR MANIPULATING THE MODEL
  const [dataForModel, setDataForModel] = useState<any>([]);

  const { open } = useSelector((state: AppState) => state.dashboardNavbar);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      force: "pull",
      mechanic: "compound",
      equipment: "body only",
      category: "strength",
      level: "beginner",
      instructions: [],
    },
    validationSchema: CreateExerciseSchema,
    onSubmit: ({}) => {
      const primaryMuscles: string[] = [];
      const secondaryMuscles: string[] = [];

      console.log(dataForModel);

      dataForModel.forEach((el: any) => {
        if (el.type === "primaryMuscle") {
          primaryMuscles.push(el.name);
        } else {
          secondaryMuscles.push(el.name);
        }
      });

      console.log({ primaryMuscles, secondaryMuscles });
    },
  });

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
                margin="2em 0"
                flexDirection="column"
              >
                <Heading size="h3">Instructions</Heading>
              </FlexWrapperDiv>
            </BottomContentWrapper>
          </FlexWrapperDiv>
          <ButtonsWrapper>
            <Button
              bColor={theme.colors.successTextColor}
              fontSize="1rem"
              type="submit"
              disabled={!formik.isValid || !formik.values.name}
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
    </DashbordLayoutHOC>
  );
};

export default AddExercise;
