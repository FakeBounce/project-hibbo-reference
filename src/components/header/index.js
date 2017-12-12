import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import {
  instanceOf,
  shape,
  func,
  string,
  arrayOf,
  oneOf,
  number,
  bool,
} from 'prop-types';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as ActionTypes from 'actionTypes/appActionTypes';

import Websocket from 'utils/websocket';
import { startWebsocket } from 'actions/websocketActions';

import Header from './components/Header';

const styles = EStyleSheet.create({
  $totalMargin: '2 * $size.cardMargin',
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: '100% - $totalMargin',
    zIndex: 1000,
  },
});

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.showConnected = {
      opacity: new Animated.Value(0),
    };

    this.logout = this.props.logout.bind(this);
  }

  componentDidMount() {
    try {
      if (!Websocket.client) {
        console.log('WEBSOCKET CONNECTED');
        this.props.startWebsocket();
      }
    } catch (error) {
      console.log('ERROR GETTING WEBSOCKET ', error);
    }
  }

  render() {
    const { translateHeader, navigation, notifications, ...rest } = this.props;

    return (
      <Animated.View
        style={[
          styles.topHeader,
          {
            transform: [
              {
                translateY: translateHeader.interpolate({
                  inputRange: [-20, 200],
                  outputRange: [-12.5, 125],
                  // extrapolate: 'clamp',
                  easing: Easing.elastic(0.8),
                }),
              },
            ],
          },
        ]}
      >
        <Header
          {...rest}
          numberOfNotification={Object.keys(notifications.unread).length}
          navigation={navigation}
          logoStyle={this.showConnected}
          onLogoPress={() => {
            navigation.navigate('Navigation');
          }}
          logout={this.logout}
        />
      </Animated.View>
    );
  }
}

HeaderContainer.propTypes = {
  notifications: shape({
    unread: arrayOf(
      shape({
        id: number,
        icon: string,
        message: string,
        theme: string,
        type: oneOf(['mission', 'message', 'default']).isRequired,
        status: oneOf(['unread']).isRequired,
        profileId: number.isRequired,
      }),
    ).isRequired,
    read: arrayOf(
      shape({
        id: number.isRequired,
        icon: string,
        message: string,
        theme: string,
        type: oneOf(['mission', 'message', 'default']).isRequired,
        status: oneOf(['read']).isRequired,
        profileId: number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  translateHeader: instanceOf(Animated.Value).isRequired,
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
  user: shape({
    token: string.isRequired,
    userDatas: shape({
      active: bool.isRequired,
      email: string.isRequired,
      id: number.isRequired,
      markedAsSpam: bool.isRequired,
      verify: bool.isRequired,
    }),
  }).isRequired,
  profileParent: shape().isRequired,
  profileChild: shape().isRequired,
  startWebsocket: func.isRequired,
  logout: func.isRequired,
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    profileParent: state.profile.parent,
    profileChild: state.profile.child,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startWebsocket: () => {
      dispatch(startWebsocket());
    },
    logout: () => {
      dispatch({ type: ActionTypes.RESET_APP });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
