import React from 'react';
import { Animated } from 'react-native';
import { shape, instanceOf, string } from 'prop-types';
import appStyles from 'styles/appStyles';

import { SContainerProgress, AProgessBar, SProgressStep } from '../styles';

const ProgressBar = ({ styling, color }) => {
  return (
    <SContainerProgress>
      <SProgressStep />
      <AProgessBar color={color} style={styling} />
    </SContainerProgress>
  );
};

ProgressBar.defaultProps = {
  color: appStyles.colors.black,
};

ProgressBar.propTypes = {
  color: string,
  styling: shape({
    width: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default ProgressBar;
