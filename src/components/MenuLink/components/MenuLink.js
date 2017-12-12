import React from 'react';
import { func } from 'prop-types';

import TouchableRipple from '../../shared/TouchableRipple';
import TextView from './TextView';

const MenuLink = ({ onBeginPress, onStopPress, to, ...props }) => {
  return (
    <TouchableRipple
      onPressIn={onBeginPress}
      onPressOut={onStopPress}
      onPress={to}
    >
      <TextView {...props} />
    </TouchableRipple>
  );
};

MenuLink.propTypes = {
  onBeginPress: func.isRequired,
  onStopPress: func.isRequired,
  to: func.isRequired,
};

export default MenuLink;
