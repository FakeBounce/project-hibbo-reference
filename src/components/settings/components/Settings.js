import React, { PureComponent } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import { string, func, shape } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import Carousel from 'shared/components/Carousel';
import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';

import parent from 'assets/settings/mock/parent.png';
import bigPiggy from 'assets/settings/big-piggy.png';
import cb from 'assets/settings/cb.png';
import colissimo from 'assets/settings/colissimo.png';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  title: {
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    color: '$colors.primary',
    textAlign: 'center',
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '$colors.borderGrey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  sectionTextWrapper: {
    marginBottom: 40,
  },
  sectionText: {
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    color: '$colors.lightGrey',
    textAlign: 'center',
  },
  slideWrapper: {
    alignItems: 'center',
  },
  thumbnailItemWrapper: {
    borderRadius: 16,
    borderColor: '$colors.lightGreyBullet',
    padding: 2,
    margin: 5,
  },
  activeThumbnailItemWrapper: {
    borderWidth: 1,
  },
  thumbnail: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '$colors.lightGreyBullet',
  },
});

const piggyCarousel = [{ uri: bigPiggy }, { uri: bigPiggy }, { uri: bigPiggy }];

const cbCarousel = [{ uri: cb }, { uri: cb }, { uri: cb }];

const renderActiveThumbnail = (item, index) => (
  <View
    key={index}
    style={[styles.thumbnailItemWrapper, styles.activeThumbnailItemWrapper]}
  >
    <View style={styles.thumbnail} />
  </View>
);

const renderEmptyThumbnail = (item, index) => (
  <View key={index} style={styles.thumbnailItemWrapper}>
    <View style={styles.thumbnail} />
  </View>
);

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      purchases: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
      scrollPosY: 0,
    };
  }

  @bind
  onPressBack() {
    this.props.navigation.goBack(null);
  }

  @bind
  onPressParentProfile() {
    this.props.navigation.navigate('ParentProfileForm');
  }

  @bind
  onPressChildProfile() {
    this.props.navigation.navigate('ChildProfileForm');
  }

  @bind
  onPressPaymentMeans() {
    this.props.navigation.navigate('PaymentMeansForm');
  }

  @bind
  onPressPurchase() {
    this.props.navigation.navigate('PurchasesList');
  }

  @bind
  onScroll(event) {
    this.setState({
      scrollPosY: event.nativeEvent.contentOffset.y,
    });
  }

  @bind
  renderPurchaseText() {
    switch (this.state.purchases.length) {
      case 0:
        return (
          <Text style={styles.sectionText}>
            {getTranslations('settings.summary.noOngoingPurchases')}
          </Text>
        );
      case 1:
        return (
          <Text style={styles.sectionText}>
            {getTranslations('settings.summary.oneOngoingPurchase')}
          </Text>
        );
      default:
        return (
          <Text style={styles.sectionText}>
            {getTranslations('settings.summary.multipleOngoingPurchases', {
              number: this.state.purchases.length,
            })}
          </Text>
        );
    }
  }

  @bind
  renderPaymentMeansItem(item, index) {
    return (
      <View key={index} style={[styles.slideWrapper, { width }]}>
        <TouchableOpacity onPress={this.onPressPaymentMeans}>
          <Image source={item.uri} />
        </TouchableOpacity>
      </View>
    );
  }

  @bind
  renderPiggyItem(item, index) {
    return (
      <View key={index} style={[styles.slideWrapper, { width }]}>
        <TouchableOpacity onPress={this.onPressChildProfile}>
          <Image source={item.uri} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title="Settings"
        onBack={this.onPressBack}
        onScroll={this.onScroll}
        scrollPosY={this.state.scrollPosY}
      >
        <View style={styles.section}>
          <TouchableOpacity onPress={this.onPressParentProfile}>
            <View style={styles.sectionTextWrapper}>
              <Text style={styles.title}>
                {getTranslations('settings.summary.myProfile')}
              </Text>
              <Text style={styles.sectionText}>Antoine</Text>
            </View>
            <Image source={parent} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTextWrapper}>
            <Text style={styles.title}>
              {getTranslations('settings.summary.myPiggyBanks')}
            </Text>
            <Text style={styles.sectionText}>Marianne</Text>
          </View>
          <Carousel
            items={piggyCarousel}
            renderItem={this.renderPiggyItem}
            renderActiveThumbnail={renderActiveThumbnail}
            renderEmptyThumbnail={renderEmptyThumbnail}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTextWrapper}>
            <Text style={styles.title}>
              {getTranslations('settings.summary.myPaymentMeans')}
            </Text>
            <Text style={styles.sectionText}>Visa</Text>
          </View>
          <Carousel
            items={cbCarousel}
            renderItem={this.renderPaymentMeansItem}
            renderActiveThumbnail={renderActiveThumbnail}
            renderEmptyThumbnail={renderEmptyThumbnail}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTextWrapper}>
            <Text style={styles.title}>
              {getTranslations('settings.summary.myPurchases')}
            </Text>
            {this.renderPurchaseText()}
          </View>
          <TouchableOpacity onPress={this.onPressPurchase}>
            <Image source={colissimo} />
          </TouchableOpacity>
        </View>
      </FlexibleHeaderLayout>
    );
  }
}

Settings.propTypes = {
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

export default Settings;
