import React from 'react';
import {
  number,
  object,
  array,
  oneOfType,
  shape,
  string,
  bool,
} from 'prop-types';
import { View, Text, Platform } from 'react-native';
import { bind } from 'decko';
import Animation from 'lottie-react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import numberAnimations from './animations';

const styles = EStyleSheet.create({
  amount: {
    textAlign: 'center',
    fontSize: 108,
    color: '$colors.primary',
    fontFamily: '$fonts.circularBook',
  },
  animation: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
});

class Number extends React.PureComponent {
  constructor(props) {
    super(props);

    this.animations = [];
  }

  @bind
  displayNumber(value, index, mappedAmount, length) {
    if (Platform.OS === 'ios') {
      return this.displayNumberIos(
        value,
        index,
        this.props.amountInfo,
        mappedAmount,
        length,
      );
    }
    return this.displayNumberAndroid(
      value,
      index,
      this.props.amountInfo,
      mappedAmount,
      length,
    );
  }

  displayNumberIos(value, index, amountInfo, mappedAmount, length) {
    const { marginTop, scale, marginRight } = amountInfo;
    let newMarginRight = marginRight;
    if (index === length) {
      newMarginRight = 0;
    } else if (value !== ',' && mappedAmount[index + 1] !== ',') {
      newMarginRight = -20 * scale;
    }
    return (
      <View
        key={`${value}${index}`}
        style={[
          {
            marginTop,
            width: 150 * scale,
            height: 220 * scale,
            marginRight: newMarginRight,
          },
        ]}
      >
        <Animation
          ref={animation => {
            if (animation) {
              this.animations[index] = animation;
              if (
                index === length ||
                (mappedAmount[0] === '0' && index === 0 && length === 1)
              ) {
                this.animations[index].play();
              }
            }
          }}
          source={numberAnimations[value]}
          speed={1}
          style={styles.animation}
        />
      </View>
    );
  }

  // eslint-disable-next-line
  displayNumberAndroid(value, index, amountInfo, mappedAmount, length) {
    return (
      <Text
        style={[
          styles.amount,
          {
            fontSize: amountInfo.fs,
          },
        ]}
        key={`${value}${index}`}
      >
        {value}
      </Text>
    );
  }

  render() {
    const { totalAmount, amountInfo, style, isDebit } = this.props;
    const length = totalAmount.length - 1;
    const mappedAmount = totalAmount.split('');
    return (
      <View style={styles.container}>
        {isDebit && (
          <Text
            style={[
              styles.amount,
              {
                fontSize: amountInfo.fs,
                top: 20 - amountInfo.marginTop,
              },
              style,
            ]}
          >
            -
          </Text>
        )}
        {mappedAmount.map((value, index) =>
          this.displayNumber(value, index, mappedAmount, length),
        )}
      </View>
    );
  }
}

Number.defaultProps = {
  style: {},
};

Number.propTypes = {
  isDebit: bool.isRequired,
  totalAmount: string.isRequired,
  amountInfo: shape({
    fs: number.isRequired,
    scale: number.isRequired,
    marginTop: number.isRequired,
  }).isRequired,
  style: oneOfType([object, number, array]),
};

export default Number;
