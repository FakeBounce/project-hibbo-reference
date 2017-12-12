import React from 'react';
import { Image } from 'react-native';
import { string, func, oneOfType, object, number } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import TouchableRipple from 'shared/TouchableRipple';

import straightArrow from 'assets/shared/straightArrow.png';
import straightArrowBlack from 'assets/shared/straightArrowBlack.png';
import flipArrow from 'assets/shared/curvedArrow.png';
import flipWhiteArrow from 'assets/shared/curvedWhiteArrow.png';
import straightArrowWhite from 'assets/shared/straightArrowWhite.png';
import cross from 'assets/shared/cross.png';
import appStyles from 'styles/appStyles';

const styles = EStyleSheet.create({
  container: {
    padding: 13 + appStyles.size.cardMargin,
  },
  straight: {
    width: 30,
    maxHeight: 20,
  },
  cross: {
    width: 16,
    height: 16,
  },
  flip: {
    marginTop: -10,
    width: 41,
    height: 39,
  },
});

const selectImage = (type, color) => {
  switch (type) {
    case 'cross':
      return cross;
    case 'flip':
      if (color === 'white') return flipWhiteArrow;
      return flipArrow;
    case 'straight':
    default:
      if (color === 'black') {
        return straightArrowBlack;
      }
      if (color === 'white') {
        return straightArrowWhite;
      }
      return straightArrow;
  }
};

const selectStyle = type => {
  switch (type) {
    case 'cross':
      return styles.cross;
    case 'flip':
      return styles.flip;
    case 'straight':
    default:
      return styles.straight;
  }
};

const Back = ({ type, action, color, style }) => {
  return (
    <TouchableRipple
      style={[styles.container, style]}
      activeOpacity={1}
      onPress={() => {
        action();
      }}
    >
      <Image source={selectImage(type, color)} style={selectStyle(type)} />
    </TouchableRipple>
  );
};

Back.defaultProps = {
  color: 'yellow',
  style: {},
};

Back.propTypes = {
  type: string.isRequired,
  action: func.isRequired,
  color: string,
  style: oneOfType([number, string, object]),
};

export default Back;
