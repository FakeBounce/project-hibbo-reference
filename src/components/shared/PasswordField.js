import React from 'react';
import { arrayOf, string, bool, func } from 'prop-types';

import CodePasswordField from './components/CodePasswordField';
import FingerPrintPasswordField from './components/FingerPrintPasswordField';

const PasswordField = ({ typedPin, withFingerPrint, onFingerPrintClick }) =>
  withFingerPrint ? (
    <FingerPrintPasswordField onFingerPrintClick={onFingerPrintClick} />
  ) : (
    <CodePasswordField typedPin={typedPin} />
  );

PasswordField.defaultProps = {
  onFingerPrintClick: () => {},
};

PasswordField.propTypes = {
  typedPin: arrayOf(string).isRequired,
  withFingerPrint: bool.isRequired,
  onFingerPrintClick: func,
};

export default PasswordField;
