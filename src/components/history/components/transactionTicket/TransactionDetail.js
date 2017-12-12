import React from 'react';
import { StyleSheet } from 'react-native';
import { string, number, shape } from 'prop-types';

import line from 'assets/history/line.png';

import GiftedAvatar from 'shared/chat/GiftedAvatar';
import AccountName from './AccountName';
import TransactionIcon from './TransactionIcon';
import TransactionMessage from './TransactionMessage';
import TransactionTotal from './TransactionTotal';

import {
  StyledContainerTransactionDetail,
  StyledAccountNumberWrapper,
  StyledImageLine,
} from '../../styles';

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 5,
  },
});

const TransactionDetail = ({
  transaction: { date, type, amount, profileGiver, notification },
}) => {
  const firstname = profileGiver ? profileGiver.firstname : 'Momo';
  const lastname = profileGiver ? profileGiver.lastname : 'Monimalz';
  const avatar = profileGiver ? profileGiver.avatar : '';

  return (
    <StyledContainerTransactionDetail>
      <GiftedAvatar user={{ name: firstname, avatar }} />
      <StyledAccountNumberWrapper>
        <AccountName name={`${firstname} ${lastname}`} />
      </StyledAccountNumberWrapper>

      <TransactionIcon
        icon={notification ? notification.icon : undefined}
        style={styles.icon}
      />
      <TransactionMessage
        message={notification ? notification.message : ''}
        date={date}
      />

      <StyledImageLine source={line} />

      <TransactionTotal amount={amount} type={type} />
    </StyledContainerTransactionDetail>
  );
};

TransactionDetail.propTypes = {
  transaction: shape({
    date: number.isRequired,
    type: string.isRequired,
    amount: number.isRequired,
    profileGiver: shape({
      firstname: string.isRequired,
      lastname: string.isRequired,
    }),
    notification: shape({
      icon: string,
      message: string,
    }),
  }).isRequired,
};

export default TransactionDetail;
