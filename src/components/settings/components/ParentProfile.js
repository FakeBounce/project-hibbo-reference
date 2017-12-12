import React, { PureComponent } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

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

class ParentProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollPosY: 0,
    };
  }
  
  render() {
    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title="Profil d'Antoine"
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
          <Image style={styles.image} source={parent} />

          <TransparentTextInput value="Antoine Dupont" />
          <TransparentTextInput value="06 49 89 97 18" />
          <TransparentTextInput value="dupont@gmail.com" />
          <TransparentTextInput value="abcdearc" secureTextEntry />

          <Text style={styles.secondaryTitle}>Adresse</Text>
          <TransparentTextInput value="Antoine Dupont" />
          <TransparentTextInput value="21, rue de Cléry" />
          <TransparentTextInput value="75002 Paris" />
          <TransparentTextInput value="France" />

          <View style={styles.buttonWrapper}>
            <YellowRoundedButton
              text="Annuler"
              action={() => {
                console.log('Annuler pressed');
              }}
            />
            <YellowRoundedButton
              text="Enregistrer"
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

ParentProfile.propTypes = {
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

export default ParentProfile;
