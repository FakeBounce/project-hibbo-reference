import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import theme from 'styles/appStyles';
import TransfertHeader from './TransfertHeader';
import MoneyPot from './MoneyPot';
import PayDebit from './PayDebit';
import styles from '../styles/transfertStyle';

const Transfert = ({
  navigation,
  animatedValue,
  selectedTab,
  changeTabCallback,
  pressInput,
  totalAmount,
  childPicture,
}) => (
  <Animated.View
    style={[
      styles.container,
      theme.cardStyle,
      {
        backgroundColor: animatedValue.backgroundColor.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1)', 'rgba(25, 235, 197, 1)'],
        }),
      },
    ]}
  >
    <TransfertHeader
      moveBar={animatedValue.moveBar}
      selectedTab={selectedTab}
      callback={changeTabCallback}
      isMoneyPot={selectedTab === 2}
    />
    {selectedTab === 2 ? (
      <MoneyPot animatedValue={animatedValue.moneyPot} />
    ) : (
      <PayDebit
        selectedTab={selectedTab}
        totalAmount={totalAmount}
        pressInput={pressInput}
        animatedValue={animatedValue}
        navigation={navigation}
        childPicture={childPicture}
      />
    )}
  </Animated.View>
);

Transfert.propTypes = {
  animatedValue: PropTypes.shape({
    opacity: PropTypes.shape({
      button: PropTypes.instanceOf(Animated.Value).isRequired,
      keyBoard: PropTypes.instanceOf(Animated.Value).isRequired,
      payTotal: PropTypes.instanceOf(Animated.Value).isRequired,
    }).isRequired,
    moneyPot: PropTypes.shape({
      buttonOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
      buttonScale: PropTypes.instanceOf(Animated.Value).isRequired,
      otherOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
    }),
    backgroundColor: PropTypes.instanceOf(Animated.Value).isRequired,
    moveBar: PropTypes.instanceOf(Animated.Value).isRequired,
  }).isRequired,
  changeTabCallback: PropTypes.func.isRequired,
  totalAmount: PropTypes.string.isRequired,
  pressInput: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  childPicture: PropTypes.string.isRequired,
};

export default Transfert;
