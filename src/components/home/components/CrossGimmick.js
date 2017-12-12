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

import cross from 'assets/home/cross.png';

const CrossGimmick = ({ position, style, animations }) => {
  const translateX = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-350, 0, 150],
  });
  const rotate = position.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['80deg', '0deg', '-80deg'],
  });
  const opacity = position.interpolate({
    inputRange: [0, 1, 1.5],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.Image
      source={cross}
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

CrossGimmick.propTypes = {
  position: instanceOf(Animated.Value).isRequired,
  style: oneOfType([number, object, array]).isRequired,
  animations: shape({
    translateYR: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default CrossGimmick;
