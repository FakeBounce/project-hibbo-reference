import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import underscore from 'assets/transfert/underscore.png';
import underscoreBlack from 'assets/transfert/underscoreBlack.png';
import underscoreMoneyPotPic from 'assets/transfert/underscoreMoneyPot.png';
import { getTranslations } from 'utils/i18n';
import TransfertHeaderButton from './TransfertHeaderButton';

import {
  STransferHeaderUnderline,
  STransferHeaderImg,
  STransferHeaderUnderLineImg,
} from '../styles';

const styles = EStyleSheet.create({
  container: {
    flex: 0,
    width: '100% - 75',
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  containerMoneyPot: {
    backgroundColor: 'transparent',
  },
});

const assets = {
  underscore: {
    notSelected: underscore,
    selected: underscoreBlack,
    underscoreMoneyPot: underscoreMoneyPotPic,
  },
};

const TransfertHeader = ({
  isMoneyPot,
  selectedTab,
  callback,
  tabs,
  moveBar,
}) => {
  let source = assets.underscore.notSelected;
  if (isMoneyPot) {
    source = assets.underscore.underscoreMoneyPot;
  }
  return (
    <View>
      <STransferHeaderImg source={source} />
      <View style={[styles.container, isMoneyPot && styles.containerMoneyPot]}>
        {tabs.map((value, key) => {
          return (
            <TransfertHeaderButton
              key={value}
              value={value}
              index={key}
              selectedTab={selectedTab}
              callback={callback}
            />
          );
        })}
      </View>
      <STransferHeaderUnderline
        style={{ transform: [{ translateX: moveBar }] }}
      >
        <STransferHeaderUnderLineImg source={assets.underscore.selected} />
      </STransferHeaderUnderline>
    </View>
  );
};

TransfertHeader.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string),
  isMoneyPot: PropTypes.bool.isRequired,
  moveBar: PropTypes.instanceOf(Animated.Value).isRequired,
};

TransfertHeader.defaultProps = {
  tabs: [
    getTranslations('transfert.header.pay'),
    getTranslations('transfert.header.debit'),
    getTranslations('transfert.header.moneyPot'),
  ],
};

export default TransfertHeader;
