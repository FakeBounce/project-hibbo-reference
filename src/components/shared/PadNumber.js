import React, { Component } from 'react';
import {
  string,
  func,
  number,
  bool,
  object,
  array,
  oneOfType,
} from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import shallowEqual from 'shallowequal';

import erasePic from 'assets/padnumber/erase.png';
import pointPic from 'assets/padnumber/point.png';
import PadNumberItem from './PadNumberItem';

const styles = EStyleSheet.create({
  numberPad: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  erase: {
    resizeMode: 'contain',
    width: 30,
    height: 25,
  },
});

class PadNumber extends Component {
  constructor(props) {
    super(props);

    this.numberAfterPoint = 0;
    this.limitPointNumber = false;
    this.amount = this.props.amount || '';
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.amount !== this.amount) {
      this.amount = nextProps.amount || '';
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      shallowEqual(this.state, nextState) &&
      shallowEqual(this.props, nextProps)
    ) {
      return false;
    }

    return true;
  }

  inputDelete(ln) {
    if (ln > 0) {
      if (this.limitPointNumber) {
        if (this.numberAfterPoint <= 0) {
          this.limitPointNumber = false;
          this.numberAfterPoint = 0;
        }
        this.numberAfterPoint--;
      }

      this.amount = this.amount.substr(0, ln - 1);
      if (this.amount === '0') {
        this.amount = '';
      }
      this.props.pressInput(this.amount);
    }
  }

  inputComa(ln) {
    if (this.amount.indexOf(',') === -1) {
      if (ln === 0) {
        this.amount = '0';
      }
      this.amount += ',';
      this.limitPointNumber = true;
      this.numberAfterPoint = -1;
    }
  }

  @bind
  parseInput(input) {
    const ln = this.amount.length;
    const { numberMax, numberAfterComaMax } = this.props;

    if (input === '<') {
      return this.inputDelete(ln);
    }
    if (
      (ln >= numberMax && !this.limitPointNumber && input !== '.') ||
      (this.limitPointNumber && this.numberAfterPoint >= numberAfterComaMax)
    ) {
      return false;
    }

    switch (input) {
      case '0':
        if (ln > 0 || this.props.password) {
          this.amount += '0';
        }
        break;
      case '.':
        this.inputComa(ln);
        break;
      default:
        this.amount += input.toString();
    }

    if (this.amount.length === ln) {
      return false;
    }

    if (this.limitPointNumber) {
      this.numberAfterPoint++;
    }

    return this.props.pressInput(this.amount);
  }

  render() {
    const { style, password } = this.props;
    const numberPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return (
      <View style={[styles.numberPad, style]}>
        {numberPad.map(value => (
          <PadNumberItem
            value={value}
            key={value}
            parseInput={this.parseInput}
          />
        ))}
        {!password ? (
          <PadNumberItem
            value="."
            image={pointPic}
            parseInput={this.parseInput}
            removeUnderScore
          />
        ) : (
          <PadNumberItem
            value=""
            parseInput={() => {}}
            removeUnderScore
            visible={false}
          />
        )}
        <PadNumberItem
          value="0"
          parseInput={this.parseInput}
          removeUnderScore
        />
        <PadNumberItem
          value="<"
          image={erasePic}
          imgStyle={styles.erase}
          parseInput={this.parseInput}
          removeUnderScore
        />
      </View>
    );
  }
}

PadNumber.defaultProps = {
  amount: '',
  style: 0,
  password: false,
  numberMax: 6,
  numberAfterComaMax: 2,
};

PadNumber.propTypes = {
  amount: string,
  pressInput: func.isRequired,
  style: oneOfType([object, number, array]),
  password: bool,
  numberMax: number,
  numberAfterComaMax: number,
};

export default PadNumber;
