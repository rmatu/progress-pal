import React from "react";
import { Field, Formik } from "formik";
import { Modal, Heading, Button } from "../../../../components/UI";
import Input from "../../../../components/UI/Input/Input";
import {
  ForgetEmailInitialValues,
  ForgetEmailSchema,
  ForgetEmailTypes,
} from "../../../../utils/formSchemas";
import { StyledP, StyledForm, Wrapper } from "./styles";
import { useSendResetPasswordEmailMutation } from "../../../../generated/graphql";
import { ReactComponent as LockIcon } from "../../../../assets/svg/lock.svg";
interface ForgotEmailModalProps {
  modalOpened: boolean;
  setModalOpened: () => void;
  showPopup: () => void;
}

const ForgotEmailModal: React.FC<ForgotEmailModalProps> = ({
  modalOpened,
  setModalOpened,
  showPopup,
}) => {
  const [sendEmail] = useSendResetPasswordEmailMutation();

  return (
    <Modal opened={modalOpened} close={setModalOpened}>
      <Wrapper>
        <Heading size="h3" color="white" marginB="0.5em">
          Forgot your password?
        </Heading>
        <LockIcon className="lockSvg"></LockIcon>
        <StyledP>
          No problem! Enter your registered email below to recive password reset
          instruction.
        </StyledP>
        <Formik
          isInitialValid={false}
          initialValues={ForgetEmailInitialValues}
          validationSchema={ForgetEmailSchema}
          onSubmit={async (
            { email }: ForgetEmailTypes,
            { setSubmitting, resetForm }
          ) => {
            await sendEmail({
              variables: {
                email,
              },
            });
            setSubmitting(false);
            resetForm();
            setModalOpened();
            showPopup();
          }}
        >
          {({ isSubmitting, isValid }) => (
            <StyledForm>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                component={Input}
              />

              <Button
                loading={isSubmitting ? "Sending..." : null}
                marginTop="3em"
                color="main"
                disabled={!isValid}
                type="submit"
              >
                Send
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </Modal>
  );
};
export default ForgotEmailModal;
