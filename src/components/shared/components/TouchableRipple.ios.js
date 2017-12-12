import React from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import {
  string,
  number,
  oneOfType,
  node,
  func,
  instanceOf,
  object,
  bool,
  array,
} from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  ripple: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    borderRadius: 70,
  },
  plusContentRipple: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const TouchableRippleComponent = ({
  onPressIn,
  onPressOut,
  onPress,
  style,
  styleTouchable,
  children,
  rippleColor,
  rippleScale,
  rippleSize,
  rippleOpacity,
  styleRipple,
  disabled,
}) => {
  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      delayPressOut={0}
      delayPressIn={0}
      disabled={disabled}
    >
      <View style={style}>
        <View style={[styleTouchable]}>{children}</View>
        <View style={[styles.plusContentRipple, styleRipple]}>
          <Animated.View
            style={[
              styles.ripple,
              {
                backgroundColor: rippleColor,
                transform: [{ scale: rippleScale }],
                opacity: rippleOpacity,
                width: rippleSize,
                height: rippleSize,
              },
            ]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableRippleComponent.defaultProps = {
  onPressIn: () => {},
  onPressOut: () => {},
  onPress: () => {},
  style: {},
  styleRipple: {},
  styleTouchable: {},
  rippleColor: '#303030',
  rippleSize: 70,
  disabled: false,
};

TouchableRippleComponent.propTypes = {
  onPressIn: func,
  onPressOut: func,
  onPress: func,
  rippleColor: string,
  rippleOpacity: instanceOf(Animated.Value).isRequired,
  rippleScale: instanceOf(Animated.Value).isRequired,
  rippleSize: number,
  style: oneOfType([object, number, array]),
  styleTouchable: oneOfType([object, number, array]),
  styleRipple: oneOfType([object, number, array]),
  children: node.isRequired,
  disabled: bool,
};

export default TouchableRippleComponent;
