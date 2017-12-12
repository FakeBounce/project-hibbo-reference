import React from 'react';
import { Text, Animated, View } from 'react-native';
import {
  oneOfType,
  string,
  number,
  instanceOf,
  object,
  array,
} from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  text: {
    color: '$colors.darkGrey',
    fontSize: 36,
    paddingTop: 7,
    fontFamily: '$fonts.circularBook',
  },
  textIpad: {
    color: '$colors.darkGrey',
    fontSize: 46,
    lineHeight: 100,
    paddingTop: 0,
    fontFamily: '$fonts.circularBook',
  },
  textHeight: {
    height: 62,
  },
  textHeightIpad: {
    height: 100,
  },
});

const TextView = ({ text, style, device, linkScale, linkOpacity }) => {
  return (
    <View>
      {device === 'iphone' && (
        <Animated.View
          style={[
            styles.textHeight,
            {
              opacity: linkOpacity,
              transform: [{ scale: linkScale }],
            },
          ]}
        >
          <Text style={[styles.text, style]}>{text}</Text>
        </Animated.View>
      )}
      {device === 'ipad' && (
        <Animated.View
          style={[
            styles.textHeightIpad,
            {
              opacity: linkOpacity,
              transform: [{ scale: linkScale }],
            },
          ]}
        >
          <Text style={[styles.textIpad, style]}>{text}</Text>
        </Animated.View>
      )}
    </View>
  );
};

TextView.defaultProps = {
  style: {},
  device: 'iphone',
};

TextView.propTypes = {
  text: string.isRequired,
  style: oneOfType([object, number, array]),
  device: string,
  linkScale: instanceOf(Animated.Value).isRequired,
  linkOpacity: instanceOf(Animated.Value).isRequired,
};

export default TextView;
