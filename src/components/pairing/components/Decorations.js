import React from 'react';
import { string, bool } from 'prop-types';

import DecorationsMonkey from './DecorationsMonkey';
import DecorationsPanda from './DecorationsPanda';
import DecorationsWhale from './DecorationsWhale';

const Decorations = ({ type, reset, animated }) => {
  switch (type) {
    case 'monkey':
      return <DecorationsMonkey animated={animated} reset={reset} />;
    case 'panda':
      return <DecorationsPanda animated={animated} reset={reset} />;
    case 'whale':
      return <DecorationsWhale animated={animated} reset={reset} />;
    default:
      return null;
  }
};

Decorations.defaultProps = {
  animated: false,
};

Decorations.propTypes = {
  type: string.isRequired,
  reset: bool.isRequired,
  animated: bool,
};

export default Decorations;
