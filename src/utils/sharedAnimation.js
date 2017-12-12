import { Animated, Easing } from 'react-native';

const getRippleAnimation = (opacity, scale, opacityMax) => {
  return [
    Animated.timing(opacity, {
      toValue: opacityMax,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    }),
  ];
};

export default getRippleAnimation;
