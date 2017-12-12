import React from 'react';
import { Animated } from 'react-native';
import {
  shape,
  instanceOf,
  func,
  string,
  arrayOf,
  number,
  bool,
} from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { getTranslations } from 'utils/i18n';

import Back from './Back';
import Input from './Input';
import Submit from './Submit';
import Link from './Link';
import FormErrors from './FormErrors';
import * as Styles from '../styles';

const Login = ({
  styling,
  errorApi,
  form,
  step,
  error,
  handleInputPosition,
  back,
  validate,
  onChange,
  inputPosition,
  errorMsg,
  changeAuthType,
  authProvider,
  editPhone,
  logginIn,
  inputTextSize,
}) => {
  return (
    <Styles.SContainerLogin style={styling}>
      <Back title="login" goBack={back} />

      <FormErrors
        error={error}
        errorMsg={errorMsg}
        inputPosition={inputPosition}
        errorApi={errorApi}
      />

      <Styles.SWrapperLogin
        onLayout={({ nativeEvent: { layout: { x, y } } }) => {
          handleInputPosition({ x, y });
        }}
      >
        <Input
          title="login"
          form={form.form}
          error={error}
          label={authProvider === '' ? form.label[step][0] : form.label[2][0]}
          name={authProvider === '' ? form.label[step][1] : form.label[2][1]}
          onChange={onChange}
          validate={authProvider === '' ? validate : editPhone}
          inputTextSize={inputTextSize}
        />
        <Styles.SBorderLogin />
      </Styles.SWrapperLogin>

      <Submit
        title="login"
        validate={authProvider === '' ? validate : editPhone}
        logginIn={logginIn}
      />

      {authProvider === '' && (
        <Styles.SLinksLogin>
          <Link
            label={getTranslations('auth.label.forgottenPwd')}
            action={() => {
              changeAuthType('resetPwd');
            }}
          />
          <Link
            label={getTranslations('auth.label.createAccount')}
            action={() => {
              changeAuthType();
            }}
          />
        </Styles.SLinksLogin>
      )}

      <KeyboardSpacer />
    </Styles.SContainerLogin>
  );
};

Login.propTypes = {
  logginIn: bool.isRequired,
  styling: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  changeAuthType: func.isRequired,
  errorApi: string.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
      password: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  step: number.isRequired,
  error: bool.isRequired,
  handleInputPosition: func.isRequired,
  back: func.isRequired,
  validate: func.isRequired,
  onChange: func.isRequired,
  inputPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  errorMsg: string.isRequired,
  authProvider: string.isRequired,
  editPhone: func.isRequired,
  inputTextSize: number.isRequired,
};

export default Login;
