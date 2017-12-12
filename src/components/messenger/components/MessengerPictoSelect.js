import React from 'react';
import { func } from 'prop-types';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import addPicto from 'assets/messenger/addPicto.png';

const styles = StyleSheet.create({
  close: {
    padding: 6,
    width: 40,
  },
});

const MessengerPictoSelect = ({ action }) => {
  return (
    <TouchableOpacity style={styles.close} onPress={action}>
      <Image source={addPicto} />
    </TouchableOpacity>
  );
};

MessengerPictoSelect.propTypes = {
  action: func.isRequired,
};

export default MessengerPictoSelect;
