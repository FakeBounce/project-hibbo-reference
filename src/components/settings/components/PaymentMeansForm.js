import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import { shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';
import TransparentTextInput from 'shared/components/TransparentTextInput';
import { YellowRoundedButton } from 'shared/Button';

import visa from 'assets/settings/visa.png';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  content: {
    flex: 1,
  },
});

class PaymentMeansForm extends PureComponent {
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
        title="Visa"
        onBack={this.onPressBack}
        flipBack
        onScroll={this.onScroll}
        scrollPosY={this.state.scrollPosY}
      >
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Image source={visa} />
            <TransparentTextInput value="Antoine Dupont" />
            <TransparentTextInput value="30000 2441 4536 903" />
            <TransparentTextInput value="27/2018" />
            <TransparentTextInput value="123" secureTextEntry />
          </View>

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

PaymentMeansForm.propTypes = {
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

export default PaymentMeansForm;
