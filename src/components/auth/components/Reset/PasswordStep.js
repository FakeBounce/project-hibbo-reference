import React from 'react';
import { StyleSheet } from 'react-native';
import { shape, func, string, arrayOf, bool, number } from 'prop-types';
import PasswordRule from '../PasswordRule';

import Submit from '../Submit';
import { SBorder, SInputPasswordView } from '../../styles';
import Input from '../Input';

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    height: 55,
    marginTop: 10,
  },
});

const PasswordStep = ({
  form,
  error,
  hide,
  onChange,
  showPassword,
  validate,
  isLoading,
  inputTextSize,
  inputTextSizePassword,
}) => {
  return (
    <SInputPasswordView>
      <Input
        inputTextSize={inputTextSizePassword}
        hide={hide}
        title="resetPwd"
        form={form.form}
        error={error}
        label={form.label[1][0]}
        name={form.label[1][1]}
        onChange={onChange}
        validate={validate}
        inputStyle={styles.input}
      />
      <SBorder marginBottom={5} />
      <Input
        inputTextSize={inputTextSize}
        hide={hide}
        title="resetPwd"
        form={form.form}
        error={error}
        autoFocus={false}
        label={form.label[1][2]}
        name={form.label[1][3]}
        onChange={onChange}
        validate={validate}
        inputStyle={styles.input}
      />
      <SBorder marginBottom={50} />
      <Submit title="resetPwd" validate={validate} logginIn={isLoading} />

      <PasswordRule
        showPassword={!isLoading ? showPassword : () => {}}
        isPaswordHidden={hide}
      />
    </SInputPasswordView>
  );
};
PasswordStep.propTypes = {
  isLoading: bool.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  error: bool.isRequired,
  showPassword: func.isRequired,
  hide: bool.isRequired,
  onChange: func.isRequired,
  validate: func.isRequired,
  inputTextSize: number.isRequired,
  inputTextSizePassword: number.isRequired,
};

export default PasswordStep;
