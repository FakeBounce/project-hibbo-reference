import React from 'react';
import { string, func } from 'prop-types';

import * as Styles from './styles';

const WifiName = ({ label, action }) => {
  return (
    <Styles.SButtonControls
      activeOpacity={1}
      onPress={() => {
        action('wifiName', label);
      }}
    >
      <Styles.STextWifiName>{label}</Styles.STextWifiName>
    </Styles.SButtonControls>
  );
};

WifiName.propTypes = {
  label: string.isRequired,
  action: func.isRequired,
};

export default WifiName;
