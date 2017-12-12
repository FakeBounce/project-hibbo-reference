import React from 'react';
import { Animated } from 'react-native';
import {
  string,
  func,
  oneOfType,
  object,
  array,
  number,
  shape,
  instanceOf,
} from 'prop-types';
import styled from 'styled-components/native';

import theme from 'styles/appStyles';

import { StyledTextSmall } from 'styledComponents/texts';

import * as Styles from './styles';

const SText = styled(Animated.createAnimatedComponent(StyledTextSmall))`
  background-color: transparent;
`;

const BottomControls = ({
  leftLabel,
  leftAction,
  rightLabel,
  rightAction,
  style,
  animations: { left, right },
}) => {
  const inputRange = [0, 1];
  const outputRange = [theme.colors.white, theme.colors.yellow];
  const leftButtonColor = left.colorInterpolate.interpolate({
    inputRange,
    outputRange,
  });
  const rightButtonColor = right.colorInterpolate.interpolate({
    inputRange,
    outputRange,
  });

  return (
    <Styles.AContainerControls style={style}>
      {leftLabel !== '' && (
        <Styles.SButtonControls
          activeOpacity={1}
          onPress={() => {
            leftAction();
          }}
          style={{
            opacity: left.opacity,
            transform: [{ translateY: left.translateY }, { scale: left.scale }],
          }}
        >
          <SText style={{ color: leftButtonColor }}>{leftLabel}</SText>
        </Styles.SButtonControls>
      )}

      <Styles.SButtonControls
        activeOpacity={1}
        onPress={() => {
          rightAction();
        }}
        style={{
          opacity: right.opacity,
          transform: [{ translateY: right.translateY }, { scale: right.scale }],
        }}
      >
        <SText style={{ color: rightButtonColor }}>{rightLabel}</SText>
      </Styles.SButtonControls>
    </Styles.AContainerControls>
  );
};

BottomControls.defaultProps = {
  leftAction: () => {},
  leftLabel: '',
  style: {},
};

BottomControls.propTypes = {
  leftLabel: string,
  leftAction: func,
  rightLabel: string.isRequired,
  rightAction: func.isRequired,
  style: oneOfType([object, number, array]),
  animations: shape({
    left: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    right: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BottomControls;
