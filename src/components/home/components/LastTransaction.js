import React from 'react';
import { number, string, shape, instanceOf, func } from 'prop-types';
import { Animated } from 'react-native';
import TouchableRipple from 'shared/TouchableRipple';
import { getTranslations } from 'utils/i18n';
import { StyledContainerLastTransaction, StyledText } from '../styles';
import LastTransactionValue from './LastTransactionValue';

const LastTransaction = ({
  animatedValues,
  type,
  amount,
  date,
  action,
  scale,
}) => {
  return (
    <StyledContainerLastTransaction
      style={{
        transform: [
          {
            translateY: animatedValues.translateY,
          },
          { scaleY: animatedValues.scaleY },
          { scale },
        ],
        opacity: animatedValues.opacity,
      }}
    >
      <TouchableRipple onPress={action}>
        {amount === 0 && date === 0 ? (
          <StyledText>{getTranslations('transaction.firstOne')}</StyledText>
        ) : (
          <LastTransactionValue type={type} amount={amount} date={date} />
        )}
      </TouchableRipple>
    </StyledContainerLastTransaction>
  );
};

LastTransaction.defaultProps = {
  type: '',
};

LastTransaction.propTypes = {
  type: string,
  amount: number.isRequired,
  date: number.isRequired,
  action: func.isRequired,
  animatedValues: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    opacity: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  scale: instanceOf(Animated.Value).isRequired,
};

export default LastTransaction;
