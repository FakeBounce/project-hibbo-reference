import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { number, shape, instanceOf, string } from 'prop-types';
import { setTimerMoneyAnimation } from 'utils/timer';

const TotalHOCHandler = Target => {
  class TotalHOC extends PureComponent {
    constructor(props) {
      super(props);

      const { amount } = this.props;

      this.state = {
        amount,
      };
      this.timerTabs = [];
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.transactionAmount !== 0 &&
        nextProps.transactionAmount !== this.props.transactionAmount
      ) {
        setTimerMoneyAnimation(
          timerTabs => {
            this.timerTabs = timerTabs;
          },
          nextProps.transactionAmount,
          nextProps.transactionType,
          true,
          state => {
            this.setState(state);
          },
        );
      } else {
        if (nextProps.transactionAmount !== 0) {
          this.timerTabs.forEach(timer => {
            clearTimeout(timer);
          });
        }
        if (nextProps.amount !== this.props.amount) {
          this.setState({ amount: nextProps.amount });
        }
      }
    }
    render() {
      const { amount } = this.state;
      return <Target {...this.props} amount={amount} />;
    }
  }

  TotalHOC.propTypes = {
    amount: number.isRequired,
    animatedValues: shape({
      translateY: instanceOf(Animated.Value),
      opacity: instanceOf(Animated.Value),
      scaleY: instanceOf(Animated.Value),
    }).isRequired,
    transactionAmount: number.isRequired,
    transactionType: string.isRequired,
    scale: instanceOf(Animated.Value).isRequired,
  };

  return TotalHOC;
};

export default TotalHOCHandler;
