import React from 'react';
import { Animated } from 'react-native';
import {
  number,
  object,
  array,
  oneOfType,
  instanceOf,
  shape,
} from 'prop-types';

import curve from 'assets/home/curve.png';

const CurveGimmick = ({ position, style, animations }) => {
  const translateX = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-300, 0, 150],
  });
  const rotate = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['50deg', '0deg', '-50deg'],
  });
  const opacity = position.interpolate({
    inputRange: [0, 1, 1.5],
    outputRange: [0, 1, 0],
  });
  return (
    <Animated.Image
      source={curve}
      style={[
        style,
        {
          opacity,
          transform: [
            { translateX },
            { rotate },
            { translateY: animations.translateYR },
            { scale: animations.scale },
          ],
        },
      ]}
    />
  );
};

CurveGimmick.propTypes = {
  position: instanceOf(Animated.Value).isRequired,
  style: oneOfType([number, object, array]).isRequired,
  animations: shape({
    translateYR: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default CurveGimmick;
