import React from 'react';
import { Animated } from 'react-native';
import { number, instanceOf, func } from 'prop-types';
import styled from 'styled-components/native';
import { getTrueNumber } from 'utils/i18n';

import { StyledTextXXBig } from 'styledComponents/texts';
import TouchableRipple from 'shared/TouchableRipple';

const AnimatedContainerMain = Animated.createAnimatedComponent(styled.View`
  align-items: center;
  margin-top: 50px;
`);

const Total = ({ amount, animatedValues, action, scale }) => {
  return (
    <AnimatedContainerMain
      style={{
        transform: [
          {
            translateY: animatedValues,
          },
          {
            scale,
          },
        ],
      }}
    >
      <TouchableRipple onPress={action} rippleSize={100}>
        <StyledTextXXBig>
          {getTrueNumber(amount, amount < 0 ? '-' : '')}
        </StyledTextXXBig>
      </TouchableRipple>
    </AnimatedContainerMain>
  );
};

Total.propTypes = {
  action: func.isRequired,
  amount: number.isRequired,
  animatedValues: instanceOf(Animated.Interpolation).isRequired,
  scale: instanceOf(Animated.Value).isRequired,
};

export default Total;
