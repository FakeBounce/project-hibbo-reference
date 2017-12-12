import React from 'react';
import { shape, string, func } from 'prop-types';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CardRow from './CardRow';

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '$colors.white',
    justifyContent: 'center',
    borderColor: '$colors.buttonGrey',
    borderBottomWidth: 1,
    width: '100% - 80',
  },
});

const CardRowSelectable = ({ card, selectCard }) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        selectCard(card);
      }}
    >
      <CardRow card={card} selectable />
    </TouchableOpacity>
  );
};

CardRowSelectable.defaultProps = {
  card: {},
};

CardRowSelectable.propTypes = {
  card: shape({
    brand: string,
    last4: string,
    id: string,
  }),
  selectCard: func.isRequired,
};
export default CardRowSelectable;
