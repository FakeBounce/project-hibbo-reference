import React from 'react';
import { string, number, shape } from 'prop-types';

import Error from './Error';

const AuthProviderErrors = ({
  fbError,
  googleError,
  fbPosition,
  googlePosition,
}) => {
  if (fbError !== '') {
    return (
      <Error
        label={fbError}
        posY={fbPosition.y - 55}
        posX={fbPosition.x + 50}
      />
    );
  } else if (googleError !== '') {
    return (
      <Error
        label={googleError}
        posY={googlePosition.y - 55}
        posX={googlePosition.x + 50}
      />
    );
  }

  return null;
};

AuthProviderErrors.propTypes = {
  fbError: string.isRequired,
  googleError: string.isRequired,
  fbPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  googlePosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
};

export default AuthProviderErrors;
