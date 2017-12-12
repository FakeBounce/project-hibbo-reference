import React from 'react';
import { number, shape, instanceOf, func, string } from 'prop-types';
import { View, Animated } from 'react-native';

import PadNumber from 'shared/PadNumber';
import TransfertButton from './TransfertButton';
import DisplayTotal from './DisplayTotal';
import styles from '../styles/transfertStyle';

const PayDebit = ({
  selectedTab,
  totalAmount,
  animatedValue,
  navigation,
  pressInput,
  childPicture,
}) => (
  <View style={{ flex: 1 }}>
    <DisplayTotal
      isDebit={selectedTab === 1}
      totalAmount={totalAmount}
      animatedValue={animatedValue.opacity.payTotal}
    />
    <TransfertButton
      navigation={navigation}
      animatedValue={animatedValue.opacity.button}
      selectedTab={selectedTab}
      amount={totalAmount}
      childPicture={childPicture}
    />

    <Animated.View
      style={[
        styles.padNumber,
        {
          opacity: animatedValue.opacity.keyBoard,
        },
      ]}
    >
      <PadNumber pressInput={pressInput} numberMax={4} amount={totalAmount} />
    </Animated.View>
  </View>
);

PayDebit.propTypes = {
  selectedTab: number.isRequired,
  totalAmount: string.isRequired,
  animatedValue: shape({
    opacity: shape({
      button: instanceOf(Animated.Value).isRequired,
      keyBoard: instanceOf(Animated.Value).isRequired,
      payTotal: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    moneyPot: shape({
      buttonOpacity: instanceOf(Animated.Value).isRequired,
      buttonScale: instanceOf(Animated.Value).isRequired,
      otherOpacity: instanceOf(Animated.Value).isRequired,
    }),
    backgroundColor: instanceOf(Animated.Value).isRequired,
    moveBar: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
  pressInput: func.isRequired,
  childPicture: string.isRequired,
};

export default PayDebit;
