import React from 'react';
import { Dimensions } from 'react-native';
import { shape, string, number, bool } from 'prop-types';
import Error from './Error';

const { width } = Dimensions.get('window');

const FormErrors = ({ error, errorMsg, inputPosition, errorApi }) => {
  if (error) {
    return (
      <Error
        label={errorMsg}
        posY={inputPosition.y}
        posX={inputPosition.x + width * 0.08}
      />
    );
  } else if (errorApi !== '') {
    return (
      <Error
        label={errorApi}
        posY={inputPosition.y}
        posX={inputPosition.x + width * 0.08}
      />
    );
  }

  return null;
};

FormErrors.propTypes = {
  error: bool.isRequired,
  errorMsg: string.isRequired,
  inputPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  errorApi: string.isRequired,
};

export default FormErrors;
