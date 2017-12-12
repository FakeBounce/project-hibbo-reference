import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations as msg } from 'utils/i18n';

import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';
import TransparentTextInput from 'shared/components/TransparentTextInput';
import { YellowRoundedButton } from 'shared/Button';

import parent from 'assets/settings/mock/parent.png';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: 68,
    height: 68,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  secondaryTitle: {
    fontFamily: '$fonts.circularBook',
    fontSize: 18,
    marginTop: 60,
  },
});

class ParentProfileForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstname: 'Antoine',
      lastname: 'Dupont',
      email: 'dupont@gmail.com',
      phone: '0649899718',
      address: '',
      postal: '',
      city: '',
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

  @bind
  updateForm(key) {
    return value => {
      this.setState(key, value);
    };
  }

  @bind
  cancel() {
    console.log('cancel', this.state);
  }

  @bind
  save() {
    console.log('save', this.state);
  }

  renderInputs(inputs) {
    return inputs.map((input, index) => {
      const { placeholder, key } = input;
      return (
        <TransparentTextInput
          key={`${key}${index}`}
          placeholder={placeholder}
          value={this.state[key]}
          onChange={this.updateForm(key)}
        />
      );
    });
  }

  render() {
    const profileInputs = [
      { placeholder: msg('common.form.firstname'), key: 'firstname' },
      { placeholder: msg('common.form.lastname'), key: 'lastname' },
      { placeholder: msg('common.form.phone'), key: 'phone' },
      { placeholder: msg('common.form.email'), key: 'email' },
    ];
    const addressInputs = [
      { placeholder: msg('common.form.address'), key: 'address' },
      { placeholder: msg('common.form.postal'), key: 'postal' },
      { placeholder: msg('common.form.city'), key: 'city' },
    ];

    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title={msg(
          'settings.parentProfile.profileOfName',
          { name: 'Antoine' },
          'name',
        )}
        onBack={this.onPressBack}
        flipBack
        onScroll={this.onScroll}
        scrollPosY={this.state.scrollPosY}
      >
        <View style={styles.wrapper}>
          <Image style={styles.image} source={parent} />

          {this.renderInputs(profileInputs)}
          <TransparentTextInput value="123456" secureTextEntry />

          <Text style={styles.secondaryTitle}>
            {msg('settings.parentProfile.address')}
          </Text>
          {this.renderInputs(addressInputs)}

          <View style={styles.buttonWrapper}>
            <YellowRoundedButton
              text={msg('common.form.cancel')}
              action={this.cancel}
            />
            <YellowRoundedButton
              text={msg('common.form.save')}
              action={this.save}
            />
          </View>
        </View>
      </FlexibleHeaderLayout>
    );
  }
}

ParentProfileForm.propTypes = {
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

export default ParentProfileForm;
