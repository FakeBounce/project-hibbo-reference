import React from 'react';
import { Animated } from 'react-native';
import { number, instanceOf, shape } from 'prop-types';
import { SGimmick } from '../../styles';

const Gimmick = ({ size, opacity, image, animatedValues }) => {
  return (
    <SGimmick
      size={size}
      source={image}
      style={[
        {
          opacity,
          transform: [
            { translateX: animatedValues.translateX },
            { translateY: animatedValues.translateY },
            {
              rotate: animatedValues.rotate.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
              }),
            },
            { scale: animatedValues.scale },
          ],
        },
      ]}
    />
  );
};

Gimmick.propTypes = {
  size: number.isRequired,
  image: number.isRequired,
  opacity: instanceOf(Animated.Value).isRequired,
  animatedValues: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    translateX: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
    rotate: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default Gimmick;
