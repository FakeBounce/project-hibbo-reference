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

import circle from 'assets/home/circle.png';

const CircleGimmick = ({ position, style, animations }) => {
  const translateX = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-150, 0, 250],
  });

  const opacity = position.interpolate({
    inputRange: [0.5, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.Image
      source={circle}
      style={[
        style,
        {
          opacity,
          transform: [
            { translateX },
            { translateY: animations.translateYL },
            { scale: animations.scale },
          ],
        },
      ]}
    />
  );
};

CircleGimmick.propTypes = {
  position: instanceOf(Animated.Value).isRequired,
  style: oneOfType([number, object, array]).isRequired,
  animations: shape({
    translateYL: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default CircleGimmick;
