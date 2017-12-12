import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { number, shape, instanceOf, string } from 'prop-types';
import { getTrueNumber } from 'utils/i18n';
import { setTimerMoneyAnimation } from 'utils/timer';
import { StyledTransactionText } from '../styles';

class TransactionAmount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.amount,
    };

    this.timerTabs = [];
  }

  componentDidMount() {
    const { amount, type } = this.props;
    setTimerMoneyAnimation(
      timerTabs => {
        this.timerTabs = timerTabs;
      },
      amount,
      type,
      false,
      state => {
        this.setState(state);
      },
    );
  }

  componentWillUnmount() {
    this.timerTabs.forEach(timer => {
      clearTimeout(timer);
    });
  }

  render() {
    const { animatedValues } = this.props;
    const { amount } = this.state;

    return (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            transform: [
              { translateX: animatedValues.translateX },
              { translateY: animatedValues.translateY },
              { scaleY: animatedValues.scaleY },
            ],
            opacity: animatedValues.opacity,
          },
        ]}
      >
        <StyledTransactionText>
          {getTrueNumber(amount, amount < 0 ? '-' : '')}
        </StyledTransactionText>
      </Animated.View>
    );
  }
}

TransactionAmount.propTypes = {
  type: string.isRequired,
  amount: number.isRequired,
  animatedValues: shape({
    translateY: instanceOf(Animated.Value),
    translateX: instanceOf(Animated.Value),
    opacity: instanceOf(Animated.Value),
    scaleY: instanceOf(Animated.Value),
  }).isRequired,
};

export default TransactionAmount;
