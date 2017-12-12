import React, { PureComponent } from 'react';
import { View, Image, Linking } from 'react-native';
import { bool, shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationActions } from 'react-navigation';

import { get } from 'utils/api';
import bg from 'assets/splashscreen/bg.png';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

class Splashscreen extends PureComponent {
  componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        console.log('URL IS ', url);
      })
      .catch(err => console.error('An error occurred', err));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rehydrated !== nextProps.rehydrated) {
      // Handle redirect after loading data from storage
      if (Object.keys(nextProps.parentProfile).length === 0) {
        // No account on the device
        this.navigate('Auth');
      } else if (
        nextProps.parentProfile.phone &&
        nextProps.parentProfile.phone === ''
      ) {
        // No phone set
        this.navigate('Auth');
      } else if (
        nextProps.parentProfile.securityCode &&
        nextProps.parentProfile.securityCode === '0'
      ) {
        // No security code
        this.navigate('Auth');
      } else {
        get('accounts/isConnected', nextProps.user.token)
          .then(() => {
            if (!nextProps.childProfile.id) {
              // No pairing done: child has amount but nothing else
              this.props.logout();
              // this.navigate('Pairing');
            } else {
              // All initial setup done
              this.navigate('Swiper');
            }
          })
          .catch(() => {
            // Not connected
            this.navigate('Auth');
          });
      }
    }
  }

  navigate(routeName) {
    setTimeout(() => {
      if (routeName === 'Auth') {
        this.props.resetApp();
      } else {
        // Reset all app Errors
        this.props.resetErrors();
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName,
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={bg} style={styles.image} />
      </View>
    );
  }
}

Splashscreen.propTypes = {
  rehydrated: bool.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
  }).isRequired,
  childProfile: shape({
    uuid: string,
  }).isRequired,
  parentProfile: shape({
    phone: string,
    securityCode: string,
  }).isRequired,
  user: shape({
    token: string,
  }).isRequired,
  resetErrors: func.isRequired,
  resetApp: func.isRequired,
  logout: func.isRequired,
};

export default Splashscreen;
