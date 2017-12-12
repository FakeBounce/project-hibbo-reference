import React from 'react';
import { shape, func, string, arrayOf, number, bool } from 'prop-types';

import CodeStep from './CodeStep';
import PasswordStep from './PasswordStep';
import MailStep from './MailStep';

const RenderStep = ({
  enterPin,
  showPassword,
  submitForm,
  token,
  pin,
  hidePassword,
  isLoading,
  step,
  form,
  error,
  onChange,
  inputTextSize,
  inputTextSizePassword,
}) => {
  switch (step) {
    case 1:
      return <CodeStep token={token} pin={pin} enterPin={enterPin} />;

    case 2:
      return (
        <PasswordStep
          form={form}
          hide={hidePassword}
          onChange={onChange}
          error={error}
          isLoading={isLoading}
          validate={submitForm}
          showPassword={showPassword}
          inputTextSize={inputTextSize}
          inputTextSizePassword={inputTextSizePassword}
        />
      );
    default:
      return (
        <MailStep
          form={form}
          inputTextSize={inputTextSize}
          onChange={onChange}
          error={error}
          isLoading={isLoading}
          validate={submitForm}
        />
      );
  }
};

RenderStep.defaultProps = {
  pin: [],
  token: '',
};

RenderStep.propTypes = {
  enterPin: func.isRequired,
  showPassword: func.isRequired,
  submitForm: func.isRequired,
  hidePassword: bool.isRequired,
  isLoading: bool.isRequired,
  token: string,
  pin: arrayOf(string),
  step: number.isRequired,
  onChange: func.isRequired,
  error: bool.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  inputTextSize: number.isRequired,
  inputTextSizePassword: number.isRequired,
};

export default RenderStep;
