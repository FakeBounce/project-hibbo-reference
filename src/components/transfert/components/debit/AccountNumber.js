import React from 'react';
import { Text } from 'react-native';
import { shape, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  subtext: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: '$fonts.circularBook',
    fontSize: '$textSizes.xsmall',
    color: '$colors.textGrey',
  },
});

const getShowableAccount = recipient => {
  // let res = recipient.IBAN;
  // const arr = [];
  // const n = 4;

  // if (recipient.Type !== 'IBAN') {
  //   res = recipient.AccountNumber;
  // }

  // for (let i = 0; i < res.length; i += n) {
  //   arr.push(res.substr(i, n));
  // }¡Û•

  return `•••• •••• •••• ${recipient.last4}`;
};

const AccountNumber = ({ recipient }) => {
  return (
    <Text style={styles.subtext}>
      {recipient.type} {getShowableAccount(recipient)}
    </Text>
  );
};

AccountNumber.propTypes = {
  recipient: shape({
    last4: string,
    type: string.isRequired,
  }).isRequired,
};

export default AccountNumber;
