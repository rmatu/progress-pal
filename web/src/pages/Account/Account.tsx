import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../generated/graphql";
import DashbordLayoutHOC from "../../hoc/DashbordLayoutHOC";
import { RightContent } from "../../hoc/styles";
import { AppState } from "../../redux/rootReducer";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencil.svg";
import { DeleteButtonWrapper, PencilIconWrapper } from "./styles";
import * as modalActions from "../../redux/modal/modalActions";
import * as navActions from "../../redux/dashboardNavbar/dashboardNavbarActions";
import { ACCOUNT } from "../../constants/routes";
import { Button, Heading, Modal, Popup } from "../../components/UI";
import { FormWrapper } from "../AddExercise/styles";
import { AccountSchema } from "../../utils/formSchemas";
import { useFormik } from "formik";
import { FlexWrapperDiv } from "../../components/FlexElements";
import InputWithIcon from "../../components/UI/InputWithIcon/InputWithIcon";
import Select from "../../components/UI/Select/Select";
import { ActivityLevel, Gender, WeightGoal } from "../../constants/onboarding";
import { ButtonsWrapper } from "../../components/Charts/UserWeightChart/styles";
import theme from "../../theme/theme";
import { EditButtonsWrapper } from "../../components/ExerciseSetsFromDB/styles";

interface AccountProps {}

const Account: React.FC<AccountProps> = () => {
  const { data: userData } = useMeQuery();

  const [disableInput, setDisableInput] = useState(true);
  const { open } = useSelector((state: AppState) => state.dashboardNavbar);
  const { show: showModal } = useSelector((state: AppState) => state.modal);
  const { show, text, popupType } = useSelector(
    (state: AppState) => state.popup,
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: userData?.me?.username,
    },
    validationSchema: AccountSchema,
    onSubmit: values => {},
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  const handleModalClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleOpenModal = () => {
    dispatch(modalActions.openModal());
  };

  const handleDeleteAccount = () => {};

  useEffect(() => {
    dispatch(navActions.changeItem(ACCOUNT));
  }, []);

  return (
    <DashbordLayoutHOC user={userData?.me}>
      <RightContent open={open}>
        <Heading size="h2" marginB="0.5em">
          Account
          <PencilIconWrapper>
            <PencilIcon onClick={() => setDisableInput(!disableInput)} />
          </PencilIconWrapper>
        </Heading>
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
            <InputWithIcon
              name="username"
              value={formik.values.username}
              type="text"
              onChange={e => formik.handleChange(e)}
              width="330px"
              error={formik.errors.username}
              title="Username"
              disabled={disableInput}
            />
          </FlexWrapperDiv>
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
            <Select
              options={[...Object.values(Gender)]}
              formik={formik}
              handleSelectChange={handleSelectChange}
              disabled={disableInput}
              name="gender"
              title="Gender"
              margin="0 0 1em 0"
              width="350px"
            />
          </FlexWrapperDiv>
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
            <Select
              options={[...Object.values(WeightGoal)]}
              formik={formik}
              handleSelectChange={handleSelectChange}
              disabled={disableInput}
              name="weightGoal"
              title="Weight goal"
              margin="0 0 1em 0"
              width="350px"
            />
          </FlexWrapperDiv>
          <FlexWrapperDiv
            justifyContent="center"
            alignItems="center"
            gap="0.8em"
          >
            <Select
              options={[...Object.values(ActivityLevel)]}
              formik={formik}
              handleSelectChange={handleSelectChange}
              disabled={disableInput}
              name="activityLevel"
              title="Activity Level"
              margin="0 0 1em 0"
              width="350px"
            />
          </FlexWrapperDiv>
          {!disableInput && (
            <ButtonsWrapper>
              <Button
                bColor={theme.colors.successTextColor}
                fontSize="1rem"
                type="submit"
                // loading={loading && "Adding..."}
                disabled={!formik.isValid || !formik.values.username}
              >
                Update
              </Button>
              <Button
                bColor={theme.colors.errorTextColor}
                fontSize="1rem"
                type="button"
                onClick={() => setDisableInput(false)}
              >
                Cancel
              </Button>
            </ButtonsWrapper>
          )}

          <DeleteButtonWrapper>
            <Button
              bColor={theme.colors.errorTextColor}
              fontSize="1rem"
              type="button"
              onClick={handleOpenModal}
            >
              Delete Account
            </Button>
          </DeleteButtonWrapper>
        </FormWrapper>
      </RightContent>
      <Modal opened={showModal} close={handleModalClose} maxWidth={"40em"}>
        <Heading size="h4">
          Are you sure you want to delete this exercise?
        </Heading>
        <EditButtonsWrapper>
          <Button
            bColor={theme.colors.successTextColor}
            fontSize="1rem"
            type="button"
            onClick={handleDeleteAccount}
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
    </DashbordLayoutHOC>
  );
};

export default Account;
