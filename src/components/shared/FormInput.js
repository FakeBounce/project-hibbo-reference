import React from 'react';
import { string } from 'prop-types';

import * as Styles from './styles';

import InputLabel from './InputLabel';
import Input from './Input';

const FormInput = ({ label, ...rest }) => {
  return (
    <Styles.SFormInput>
      <InputLabel label={label} />
      <Input {...rest} />
    </Styles.SFormInput>
  );
};

FormInput.propTypes = {
  label: string.isRequired,
};

export default FormInput;
