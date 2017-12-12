import React from 'react';
import { string, instanceOf, func, shape, number } from 'prop-types';
import { Animated } from 'react-native';
import { getTranslations } from 'utils/i18n';

import { GreyRoundedButton } from 'shared/Button';
import styles from '../styles/transfertStyle';

const TransfertButton = ({
  navigation,
  animatedValue,
  selectedTab,
  amount,
  childPicture,
}) => (
  <Animated.View
    style={[
      styles.button,
      {
        opacity: animatedValue,
        transform: [{ scale: animatedValue }],
      },
    ]}
  >
    <GreyRoundedButton
      action={() => {
        if (amount !== '') {
          navigation.navigate('TransfertStep', {
            selectedTab,
            amount,
            step: 1,
          });
        } else {
          console.log('NO AMOUNT GOTTEN');
        }
      }}
      text={getTranslations('transfert.button.sendTo')}
      profilePicture={childPicture}
    />
  </Animated.View>
);

TransfertButton.propTypes = {
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
  animatedValue: instanceOf(Animated.Value).isRequired,
  selectedTab: number.isRequired,
  amount: string.isRequired,
  childPicture: string.isRequired,
};

export default TransfertButton;
