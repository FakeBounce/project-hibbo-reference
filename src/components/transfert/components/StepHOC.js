import React from 'react';
import { shape, func, string, number } from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from 'shared/Header';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Step = ({ Target, navigation, headerText, resetSteps, ...props }) => (
  <View style={styles.wrapper}>
    {headerText !== '' && (
      <Header navigation={navigation} text={headerText} cross={resetSteps} />
    )}
    <Target {...props} navigation={navigation} />
  </View>
);

Step.defaultProps = {
  headerText: '',
  resetSteps: 0,
};

Step.propTypes = {
  Target: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
  headerText: string,
  resetSteps: number,
};

export default Step;
