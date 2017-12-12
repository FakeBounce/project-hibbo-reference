import React from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import {
  string,
  number,
  oneOfType,
  node,
  object,
  func,
  array,
} from 'prop-types';
import { setAndroidRipple } from 'actions/appActions';
import { connect } from 'react-redux';

const TouchableRipple = ({
  value,
  onPress,
  delay,
  onPressSetAndroidRipple,
  styleTouchable,
  style,
  children,
}) => {
  const onPressRipple = ({ nativeEvent: { pageX: x, pageY: y } }) => {
    onPressSetAndroidRipple({ x, y });
    Animated.delay(delay).start(() => {
      onPress(value);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPressRipple}>
      <View style={style}>
        <View style={styleTouchable}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableRipple.defaultProps = {
  value: '',
  onPress: () => {},
  delay: 250,
  style: {},
  styleTouchable: {},
};

TouchableRipple.propTypes = {
  value: string,
  onPress: func,
  delay: number,
  onPressSetAndroidRipple: func.isRequired,
  styleTouchable: oneOfType([object, number, array]),
  style: oneOfType([object, number, array]),
  children: node.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onPressSetAndroidRipple: androidModal => {
      dispatch(setAndroidRipple(androidModal));
    },
  };
};

export default connect(null, mapDispatchToProps)(TouchableRipple);
