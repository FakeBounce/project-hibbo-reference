import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';

import misterTracerLogo from 'assets/settings/mister-t-logo.png';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '$colors.borderGrey',
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    fontFamily: '$fonts.circularBook',
    color: '$colors.primary',
    fontSize: 18,
  },
  value: {
    fontFamily: '$fonts.circularMedium',
    color: '$colors.primary',
    fontSize: 25,
    marginBottom: 15,
  },
  misterTracerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  misterTracerLogo: {
    width: 46,
    height: 46,
    marginRight: 15,
  },
  misterTracerText: {
    fontFamily: '$fonts.circularBook',
    color: '$colors.primary',
    fontSize: 15,
    flex: 1,
  },
  misterTracerLink: {
    fontFamily: '$fonts.circularBold',
    color: '$colors.textLink',
    textDecorationLine: 'underline',
  },
});

const purchases = [
  {
    id: 345678,
    date: '28/05/2017',
    amount: '129€',
  },
  {
    id: 345679,
    date: '28/05/2017',
    amount: '129€',
  },
];

const renderPurchase = purchase => {
  return (
    <View key={purchase.id} style={styles.section}>
      <Text style={styles.label}>
        {getTranslations('settings.purchases.orderId')}
      </Text>
      <Text style={styles.value}>
        {purchase.id}
      </Text>

      <Text style={styles.label}>
        {getTranslations('settings.purchases.date')}
      </Text>
      <Text style={styles.value}>
        {purchase.date}
      </Text>

      <Text style={styles.label}>
        {getTranslations('settings.purchases.amount')}
      </Text>
      <Text style={styles.value}>
        {purchase.amount}
      </Text>

      <View style={styles.misterTracerWrapper}>
        <Image style={styles.misterTracerLogo} source={misterTracerLogo} />
        <Text style={styles.misterTracerText}>
          {getTranslations('settings.purchases.followStatusOfYourOrderWith')}
          <Text style={styles.misterTracerLink}>Mister tracer</Text>
        </Text>
      </View>
    </View>
  );
};

class PurchaseList extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      scrollPosY: 0,
    };
  }
  
  @bind
  onPressBack() {
    this.props.navigation.goBack();
  }
  
  @bind
  onScroll(event) {
    this.setState({
      scrollPosY: event.nativeEvent.contentOffset.y,
    });
  }
  
  
  render() {
    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title={getTranslations('settings.purchases.myOrders')}
        onBack={this.onPressBack}
        flipBack
        onScroll={this.onScroll}
        scrollPosY={this.state.scrollPosY}
      >
        <View style={styles.wrapper}>
          {purchases.map(renderPurchase)}
        </View>
      </FlexibleHeaderLayout>
    );
  }
}

PurchaseList.propTypes = {
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
};

export default PurchaseList;
