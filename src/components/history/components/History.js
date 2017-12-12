import React from 'react';
import { View, SectionList } from 'react-native';
import { oneOfType, string, number, arrayOf, shape, func } from 'prop-types';

import { StyledContainerCard } from 'styles/styledComponents/containers';

import keyExtractor from 'utils/keyExtractor';
import filterTransactions from 'utils/filterTransactions';

import Header from './Header';
import AccountDetails from './AccountDetails';
import TransactionRow from './TransactionRow';
import SectionHeader from './SectionHeader';

const StyledContainer = StyledContainerCard.extend`
  background-color: ${props => props.theme.colors.buttonYellow};
  overflow: hidden;
`;

const History = ({
  childAvatar,
  totalAmount,
  piggyAmount,
  bankAmount,
  accountNumber,
  transactions,
  navigation: { goBack },
  openTransaction,
}) => {
  let filteredTransactions = [];
  if (transactions.length > 0) {
    filteredTransactions = filterTransactions(transactions);
  }

  return (
    <StyledContainer>
      <SectionList
        sections={filteredTransactions}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <View>
            <Header
              avatar={childAvatar}
              backAction={() => {
                goBack();
              }}
            />
            <AccountDetails
              totalAmount={totalAmount}
              piggyAmount={piggyAmount}
              bankAmount={bankAmount}
              accountNumber={accountNumber}
            />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        renderItem={({ item }) => {
          return (
            <TransactionRow
              date={item.date}
              amount={item.amount}
              type={item.type}
              profileGiver={item.profileGiver}
              notification={item.notification}
              action={openTransaction}
            />
          );
        }}
      />
    </StyledContainer>
  );
};

History.defaultProps = {
  accountNumber: '0123456789',
};

History.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
  }).isRequired,
  childAvatar: oneOfType([string, number]).isRequired,
  totalAmount: number.isRequired,
  bankAmount: number.isRequired,
  piggyAmount: number.isRequired,
  accountNumber: string,
  transactions: arrayOf(
    shape({
      date: number.isRequired,
      type: string.isRequired,
      amount: number.isRequired,
      profileGiver: shape({
        firstname: string.isRequired,
        lastname: string.isRequired,
        avatar: string,
      }),
      notification: shape({
        icon: string,
        message: string,
      }),
    }),
  ).isRequired,
  openTransaction: func.isRequired,
};

export default History;
