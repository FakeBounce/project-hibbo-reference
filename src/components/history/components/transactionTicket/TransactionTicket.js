import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { string, number, func, shape } from 'prop-types';

import waves from 'assets/history/waves.png';

import {
  StyledContainerTransactionTicket,
  StyledHack,
  StyledImageWaves,
} from '../../styles';

import TransactionHeader from './TransactionHeader';
import TransactionDetail from './TransactionDetail';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  width: {
    width: deviceWidth / 1.65,
  },
});

const TransactionTicket = ({ transaction, closeAction, onLayout, width }) => {
  return (
    <StyledHack onLayout={onLayout}>
      <StyledContainerTransactionTicket>
        <ScrollView>
          <StyledHack style={styles.width}>
            <TransactionHeader closeAction={closeAction} />

            <TransactionDetail transaction={transaction} />
          </StyledHack>
        </ScrollView>
      </StyledContainerTransactionTicket>

      <StyledImageWaves source={waves} style={{ width }} />
    </StyledHack>
  );
};

TransactionTicket.propTypes = {
  transaction: shape({
    icon: string,
    message: string,
    date: number.isRequired,
    amount: number.isRequired,
    profileGiver: shape({
      firstname: string.isRequired,
      avatar: string,
    }),
  }).isRequired,
  closeAction: func.isRequired,
  onLayout: func.isRequired,
  width: number.isRequired,
};

export default TransactionTicket;
