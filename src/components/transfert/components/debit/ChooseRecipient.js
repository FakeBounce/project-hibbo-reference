import React, { PureComponent } from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { FlatList, View, Text } from 'react-native';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';

import TouchableRipple from 'shared/TouchableRipple';

import { getTranslations } from 'utils/i18n';

import RecipientRow from './RecipientRow';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontFamily: '$fonts.circularBook',
    fontSize: '$textSizes.small',
    color: '$colors.primary',
    textDecorationLine: 'underline',
  },
  textView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    marginVertical: 15,
    backgroundColor: '$colors.white',
    justifyContent: 'center',
    borderColor: '$colors.buttonGrey',
    borderBottomWidth: 1,
    width: '100% - 20',
  },
});

class ChooseRecipient extends PureComponent {
  @bind
  selectRecipient(recipient) {
    this.props.setSelectedBankAccount(recipient);
    this.props.action();
  }

  @bind
  renderRecipient({ item }) {
    return (
      <RecipientRow selectRecipient={this.selectRecipient} recipient={item} />
    );
  }

  @bind
  // eslint-disable-next-line
  renderSeparator() {
    return <View style={styles.row} />;
  }

  render() {
    const { recipients, saveBankAccount } = this.props;
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={recipients}
          renderItem={this.renderRecipient}
          keyExtractor={(item, index) => `${item.id}${index}`}
          style={styles.list}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={styles.textView}>
          <TouchableRipple
            onPress={() => {
              saveBankAccount({
                accountNumber: 'FR89370400440532013000',
                countryCode: 'fr',
                currency: 'eur',
                accountHolderName: `${recipients.length} Nicolas thing-leoh`,
                accountHolderType: 'individual',
              });
            }}
          >
            <Text style={styles.text}>
              {getTranslations('transfert.debit.step1.add.button')}
            </Text>
          </TouchableRipple>
        </View>
      </View>
    );
  }
}

ChooseRecipient.propTypes = {
  recipients: arrayOf(
    shape({
      routing_number: string,
      last4: string.isRequired,
      id: string.isRequired,
      account_holder_name: string.isRequired,
      status: string.isRequired,
    }),
  ).isRequired,
  saveBankAccount: func.isRequired,
  setSelectedBankAccount: func.isRequired,
  action: func.isRequired,
};

export default ChooseRecipient;
