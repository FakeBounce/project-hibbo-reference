import React from 'react';
import { func, shape, string } from 'prop-types';
import { TouchableOpacity } from 'react-native';

import CardRow from './CardRow';

const SelectCard = ({ switchModalVisible, card }) => {
  return (
    <TouchableOpacity onPress={switchModalVisible}>
      <CardRow card={card} />
    </TouchableOpacity>
  );
};

SelectCard.defaultProps = {
  card: null,
};

SelectCard.propTypes = {
  switchModalVisible: func.isRequired,
  card: shape({
    brand: string.isRequired,
    last4: string.isRequired,
    id: string.isRequired,
  }),
};
export default SelectCard;
