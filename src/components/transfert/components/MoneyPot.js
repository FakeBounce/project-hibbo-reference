import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated } from 'react-native';
import { getTranslations } from 'utils/i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

import moneypot from 'assets/transfert/moneypotImg.gif';

const styles = EStyleSheet.create({
  titleMoneyPot: {
    fontSize: 40,
    fontFamily: '$fonts.circularBold',
    color: '$colors.moneyPotText',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    lineHeight: 40,
  },
  subtitleMoneyPot: {
    fontSize: 16,
    fontFamily: '$fonts.circularBold',
    color: '$colors.moneyPotText',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageMoneyPot: {
    width: 254.5,
    height: 243.5,
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MoneyPot = ({ animatedValue }) => (
  <View style={styles.wrapper}>
    <View style={styles.content}>
      <Animated.View
        style={{
          opacity: animatedValue.buttonOpacity,
          transform: [{ scale: animatedValue.buttonOpacity }],
        }}
      >
        <Text style={styles.titleMoneyPot}>
          {getTranslations('transfert.moneypot.main.first')}
        </Text>
        <Text style={styles.titleMoneyPot}>
          {getTranslations('transfert.moneypot.main.second')}
        </Text>
        <Text style={styles.subtitleMoneyPot}>
          {getTranslations('transfert.moneypot.message')}
        </Text>
      </Animated.View>
    </View>
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: animatedValue.otherOpacity,
          transform: [{ scale: animatedValue.otherOpacity }],
        },
      ]}
    >
      <View style={styles.imageMoneyPot}>
        <Image source={moneypot} style={styles.imageMoneyPot} />
      </View>
    </Animated.View>
  </View>
);

MoneyPot.propTypes = {
  animatedValue: PropTypes.shape({
    buttonOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
    buttonScale: PropTypes.instanceOf(Animated.Value).isRequired,
    otherOpacity: PropTypes.instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default MoneyPot;
