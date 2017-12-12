import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';
import TransparentTextInput from 'shared/components/TransparentTextInput';
import { YellowRoundedButton } from 'shared/Button';
import Toggle from 'shared/components/Toggle';

import child from 'assets/settings/mock/child.png';
import plusIcon from 'assets/settings/plus-icon.png';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 68,
    height: 68,
  },
  genderPicker: {},
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  label: {
    fontFamily: '$fonts.circularBook',
    color: '$colors.primary',
    fontSize: 18,
    marginTop: 25,
  },
  value: {
    fontFamily: '$fonts.circularMedium',
    color: '$colors.primary',
    fontSize: 25,
  },
  transferLink: {
    fontFamily: '$fonts.circularBook',
    color: '$colors.primary',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  uploadButton: {
    backgroundColor: '$colors.buttonGrey',
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ChildProfileForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollPosY: 0,
    };
  }

  @bind
  onPressTransfer() {
    this.props.navigation.navigate('ChildProfileTransfer');
  }

  @bind
  onPressBack() {
    this.props.navigation.goBack();
  }

  render() {
    const profile = child ? (
      <Image style={styles.image} source={child} />
    ) : (
      <TouchableOpacity>
        <View style={styles.uploadButton}>
          <Image source={plusIcon} />
        </View>
      </TouchableOpacity>
    );

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
          <View style={styles.profileWrapper}>
            {profile}
            <Toggle />
          </View>

          <TransparentTextInput value="Marianne" />
          <View style={styles.genderPicker} />

          <Text style={styles.label}>
            {getTranslations('settings.childProfile.birthDay')}
          </Text>
          <TransparentTextInput value="11/05/2017" />

          <Text style={styles.label}>
            {getTranslations('settings.childProfile.standBy')}
          </Text>
          <TransparentTextInput value="19:30" />

          <Text style={styles.label}>
            {getTranslations('settings.childProfile.accountNumber')}
          </Text>
          <TransparentTextInput value="0003........404" />

          <Text style={styles.label}>
            {getTranslations('settings.childProfile.piggyBankBalance')}
          </Text>
          <Text style={styles.value}>34€</Text>

          <Text style={styles.label}>
            {getTranslations('settings.childProfile.accountBalance')}
          </Text>
          <Text style={styles.value}>347€</Text>

          <Text onPress={this.onPressTransfer} style={styles.transferLink}>
            {getTranslations('settings.childProfile.transfer')}
          </Text>

          <View style={styles.buttonWrapper}>
            <YellowRoundedButton
              text={getTranslations('common.form.cancel')}
              action={() => {
                console.log('Annuler pressed');
              }}
            />
            <YellowRoundedButton
              text={getTranslations('common.form.save')}
              action={() => {
                console.log('Enregistrer pressed');
              }}
            />
          </View>
        </View>
      </FlexibleHeaderLayout>
    );
  }
}

ChildProfileForm.propTypes = {
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

export default ChildProfileForm;
