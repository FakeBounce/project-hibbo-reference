import React, { PureComponent } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';
import TransparentTextInput from 'shared/components/TransparentTextInput';

import child from 'assets/settings/mock/child.png';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  primaryText: {
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    color: '$colors.primary',
    textAlign: 'center',
    marginTop: 40,
  },
  secondaryText: {
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    color: '$colors.lightGrey',
    textAlign: 'center',
  },
  secondaryTextPlus: {
    marginBottom: 26,
  },
  img: {
    marginTop: 26,
    alignItems: 'center',
  },
});

class ChildProfileTransfer extends PureComponent {
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

  render() {
    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title={getTranslations(
          'settings.transfer.piggyBankOfName',
          { name: 'Marianne' },
          'name',
        )}
        onBack={this.onPressBack}
        flipBack
        onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: this.state.scrollPosY } },
          },
        ],
        { useNativeDriver: true },
      )}
        scrollPosY={this.state.scrollPosY}
      >
        <View style={styles.wrapper}>
          <Text style={styles.secondaryTextPlus}>
            {getTranslations('settings.transfer.subTitle')}
          </Text>

          <TransparentTextInput value="35€" />

          <View style={styles.img}>
            <Image style={styles.image} source={child} />
          </View>

          <Text style={styles.primaryText}>
            {getTranslations(
              'settings.transfer.onTheAccountOfName',
              { name: 'Marianne' },
              'name',
            )}
          </Text>
          <Text style={styles.secondaryText}>BP - 0439 456387 300 33</Text>
        </View>
      </FlexibleHeaderLayout>
    );
  }
}

ChildProfileTransfer.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChildProfileTransfer;
