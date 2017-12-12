import React from 'react';
import { string, number, func } from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $initialWidth: '100% - 75',
  selected: {
    color: 'black',
  },
  notSelected: {
    color: 'rgba(0,0,0,0.5)',
  },
  notSelectedView: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  view: {
    flexDirection: 'column',
    width: '$initialWidth / 3',
  },
  tab: {
    textAlign: 'center',
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    marginBottom: 4,
  },
});

const TransfertHeaderButton = ({ value, index, selectedTab, callback }) => (
  <TouchableOpacity activeOpacity={1} onPress={() => callback(index)}>
    <View
      style={[
        index === selectedTab ? styles.selectedView : styles.notSelectedView,
        styles.view,
      ]}
    >
      <Text
        style={[
          index === selectedTab ? styles.selected : styles.notSelected,
          styles.tab,
        ]}
      >
        {value}
      </Text>
    </View>
  </TouchableOpacity>
);

TransfertHeaderButton.propTypes = {
  value: string.isRequired,
  index: number.isRequired,
  selectedTab: number.isRequired,
  callback: func.isRequired,
};

export default TransfertHeaderButton;
