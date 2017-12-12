import React from 'react';
import { View } from 'react-native';
import { string, number } from 'prop-types';

import AccountNumber from './AccountNumber';
import TotalBalance from './TotalBalance';
import AmountDetails from './AmountDetails';

const AccountDetails = ({
  totalAmount,
  piggyAmount,
  bankAmount,
  accountNumber,
}) => {
  return (
    <View>
      <AccountNumber accountNumber={accountNumber} />
      <TotalBalance totalAmount={totalAmount} />
      <AmountDetails piggyAmount={piggyAmount} bankAmount={bankAmount} />
    </View>
  );
};

AccountDetails.propTypes = {
  totalAmount: number.isRequired,
  bankAmount: number.isRequired,
  piggyAmount: number.isRequired,
  accountNumber: string.isRequired,
};

export default AccountDetails;
