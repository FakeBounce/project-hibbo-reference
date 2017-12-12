import React from 'react';
import { shape, string, func } from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import GiftedAvatar from 'shared/chat/GiftedAvatar';
import AccountNumber from './AccountNumber';

const styles = EStyleSheet.create({
  wrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 5,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: '$fonts.circularBook',
    fontSize: '$textSizes.small',
    color: '$colors.primary',
  },
  textView: {
    paddingLeft: 20,
  },
});

const RecipientRow = ({ recipient, selectRecipient }) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => {
        selectRecipient(recipient);
      }}
    >
      <GiftedAvatar
        user={{
          name: recipient.account_holder_name,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.text}>{recipient.account_holder_name}</Text>
        <AccountNumber recipient={{ ...recipient, type: 'IBAN' }} />
      </View>
    </TouchableOpacity>
  );
};

RecipientRow.propTypes = {
  recipient: shape({
    account_holder_name: string.isRequired,
    id: string.isRequired,
  }).isRequired,
  selectRecipient: func.isRequired,
};

export default RecipientRow;
