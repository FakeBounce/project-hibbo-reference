import React from 'react';
import { string, bool } from 'prop-types';

import DecorationsMonkeyFront from './DecorationsMonkeyFront';
import DecorationsPandaFront from './DecorationsPandaFront';
import DecorationsWhaleFront from './DecorationsWhaleFront';

const DecorationsFront = ({ type, reset, animated }) => {
  switch (type) {
    case 'monkey':
      return <DecorationsMonkeyFront animated={animated} reset={reset} />;
    case 'panda':
      return <DecorationsPandaFront animated={animated} reset={reset} />;
    case 'whale':
      return <DecorationsWhaleFront animated={animated} reset={reset} />;
    default:
      return null;
  }
};

DecorationsFront.defaultProps = {
  animated: false,
};

DecorationsFront.propTypes = {
  type: string.isRequired,
  reset: bool.isRequired,
  animated: bool,
};

export default DecorationsFront;
