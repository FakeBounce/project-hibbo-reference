import React from 'react';
import { string, oneOfType, object, array } from 'prop-types';

import ModalIconPanelItem from 'shared/components/ModalIconPanelItem';

const TransactionIcon = ({ icon, style }) => {
  return (
    <ModalIconPanelItem
      icon={{ icon: `${icon === 'piece_2euros' ? 'apple' : icon}_blanc` }}
      style={style}
    />
  );
};

TransactionIcon.defaultProps = {
  icon: 'apple',
  style: {},
};

TransactionIcon.propTypes = {
  icon: string,
  style: oneOfType([object, string, array]),
};

export default TransactionIcon;
