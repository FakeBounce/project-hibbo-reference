import React from 'react';
import { shape, string, bool } from 'prop-types';
import { Text, View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getTranslations } from 'utils/i18n';

import cb from 'assets/creditCard/cb.png';
import visa from 'assets/creditCard/visa.png';
import dropdownArrow from 'assets/transfert/dropdownArrow.png';
import dropdownArrowRight from 'assets/transfert/dropdownArrowRight.png';

const styles = EStyleSheet.create({
  wrapper: {
    width: '100% - 80',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 5,
    flexDirection: 'row',
  },
  border: {
    borderRadius: 10,
    borderColor: '$colors.borderGrey',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: '$fonts.circularBook',
    fontSize: 14,
    color: '$colors.primary',
    paddingLeft: 20,
  },
  arrow: {
    margin: 5,
  },
  provider: {
    marginLeft: 20,
  },
});

// @todo: Find the key of the cardProvider for other cards
const cardTypeImg = {
  Visa: visa,
  Cb: cb,
  MasterCard: cb,
  Discover: cb,
};

const CardRow = ({ card, selectable }) => {
  if (!card || !card.last4) {
    return (
      <View style={[styles.wrapper, !selectable && styles.border]}>
        <Text style={styles.text}>
          {getTranslations('transfert.pay.addCard')}
        </Text>
        <Image source={dropdownArrowRight} style={styles.arrow} />
      </View>
    );
  }
  return (
    <View style={[styles.wrapper, !selectable && styles.border]}>
      <Image source={cardTypeImg[card.brand]} style={styles.provider} />
      <Text style={styles.text}>****{card.last4}</Text>
      {!selectable && <Image source={dropdownArrow} style={styles.arrow} />}
    </View>
  );
};

CardRow.defaultProps = {
  card: null,
  selectable: false,
};

CardRow.propTypes = {
  card: shape({
    brand: string,
    last4: string,
    id: string,
  }),
  selectable: bool,
};
export default CardRow;
