import React, { PureComponent } from 'react';
import {
  string,
  number,
  object,
  array,
  oneOfType,
  bool,
  instanceOf,
} from 'prop-types';
import { View, Text, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import mainStyles from '../styles/transfertStyle';
import Number from './Number';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
    textAlign: 'center',
    fontSize: 108,
    color: '$colors.blueGreen',
    top: 23,
    left: 6,
    fontFamily: '$fonts.circularBook',
  },
  textView: {
    flexDirection: 'row',
    top: 15,
    left: 6,
  },
});

class DisplayTotal extends PureComponent {
  constructor(props) {
    super(props);
    this.amountInfo = {
      fs: 108,
      scale: 0.5,
      marginTop: 20,
    };
  }

  getAmountInfo() {
    let lengthAmount = this.props.totalAmount
      ? this.props.totalAmount.length
      : 0;
    if (this.props.isDebit) {
      lengthAmount += 1;
    }
    switch (lengthAmount) {
      case 4:
        this.amountInfo = {
          fs: 78,
          scale: 0.35,
          marginTop: 17,
          marginRight: -20,
        };
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        this.amountInfo = {
          fs: 58,
          scale: 0.26,
          marginTop: 15,
          marginRight: -15,
        };
        break;
      default:
        this.amountInfo = {
          fs: 108,
          scale: 0.48,
          marginTop: 20,
          marginRight: -30,
        };
        break;
    }
  }

  render() {
    this.getAmountInfo();
    return (
      <Animated.View
        style={[
          mainStyles.header,
          {
            opacity: this.props.animatedValue,
            transform: [{ scale: this.props.animatedValue }],
          },
        ]}
      >
        <View style={[styles.container, this.props.style]}>
          <View style={[styles.textView, { top: this.amountInfo.marginTop }]}>
            <Number
              amountInfo={this.amountInfo}
              totalAmount={this.props.totalAmount}
              isDebit={this.props.isDebit}
            />
          </View>
          <Text style={[styles.sign, { fontSize: this.amountInfo.fs }]}>€</Text>
        </View>
      </Animated.View>
    );
  }
}

DisplayTotal.propTypes = {
  totalAmount: string,
  style: oneOfType([object, number, array]),
  isDebit: bool.isRequired,
  animatedValue: instanceOf(Animated.Value).isRequired,
};

DisplayTotal.defaultProps = {
  totalAmount: '',
  style: {},
};

export default DisplayTotal;
