import React from 'react';
import { shape, string, func, bool, arrayOf, number } from 'prop-types';
import { View } from 'react-native';

import { SBorder } from '../../styles';
import Input from '../Input';
import Submit from '../Submit';

const MailStep = ({
  form,
  onChange,
  error,
  validate,
  isLoading,
  inputTextSize,
}) => {
  return (
    <View>
      <Input
        title="resetPwd"
        form={form.form}
        error={error}
        label={form.label[0][0]}
        name={form.label[0][1]}
        onChange={onChange}
        validate={validate}
        inputTextSize={inputTextSize}
      />
      <SBorder marginBottom={50} />
      <Submit title="resetPwd" validate={validate} logginIn={isLoading} />
    </View>
  );
};

MailStep.propTypes = {
  isLoading: bool.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  error: bool.isRequired,
  onChange: func.isRequired,
  validate: func.isRequired,
  inputTextSize: number.isRequired,
};

export default MailStep;
