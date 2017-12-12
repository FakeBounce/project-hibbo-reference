import React from 'react';
import {
  number,
  func,
  string,
  bool,
  object,
  array,
  oneOfType,
} from 'prop-types';
import { Text, Image, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import underscoreFull from 'assets/padnumber/underscoreFull.png';
import TouchableRipple from 'shared/TouchableRipple';

const styles = EStyleSheet.create({
  $totalMargin: '2 * $size.cardMargin',
  $initialWidth: '100% * 0.33',
  keyboardButton: {
    padding: 8,
    width: '$initialWidth - $totalMargin',
    textAlign: 'center',
    fontSize: 36,
    color: '$colors.primary',
    fontFamily: '$fonts.circularBook',
  },
  img: {
    width: '$initialWidth - $totalMargin',
  },
  containerRipple: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$initialWidth - $totalMargin',
    height: 63,
  },
});

const PadNumberItem = ({
  parseInput,
  image,
  removeUnderScore,
  value,
  imgStyle,
  visible,
}) =>
  visible ? (
    <TouchableRipple
      styleTouchable={styles.containerRipple}
      onPress={parseInput}
      value={value}
      delay={0}
    >
      {image ? (
        <Image source={image} style={imgStyle} />
      ) : (
        <Text style={styles.keyboardButton}>{value}</Text>
      )}
      {!removeUnderScore && (
        <Image style={styles.img} source={underscoreFull} />
      )}
    </TouchableRipple>
  ) : (
    <View style={styles.containerRipple} />
  );

PadNumberItem.defaultProps = {
  image: undefined,
  removeUnderScore: false,
  imgStyle: {},
  visible: true,
};

PadNumberItem.propTypes = {
  parseInput: func.isRequired,
  image: number,
  removeUnderScore: bool,
  value: string.isRequired,
  imgStyle: oneOfType([object, number, array]),
  visible: bool,
};

export default PadNumberItem;
