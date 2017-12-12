import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { shape, arrayOf, number, string, func, object } from 'prop-types';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Transitioner, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import shallowEqual from 'shallowequal';

import theme from 'styles/appStyles';

import { bg } from 'styles/backgrounds';

import Swiper from './Swiper';

const styles = EStyleSheet.create({
  $totalMargin: '2 * $size.cardMargin',
  wrapper: {
    flex: 1,
  },
  scenes: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  cardStyle: {
    height: '100% - $totalMargin',
    width: '100% - $totalMargin',
    backgroundColor: 'white',
  },
});

class RouterTransitioner extends Component {
  static configureTransition() {
    return Swiper.configureTransition(500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      shallowEqual(this.state, nextState) &&
      shallowEqual(this.props, nextProps)
    ) {
      return false;
    }

    return true;
  }

  renderScene({ layout, position }, { route, index }) {
    const { dispatch } = this.props.navigation;
    const Scene = this.props.router.getComponentForRouteName(route.routeName);
    const childNavigation = addNavigationHelpers({ dispatch, state: route });
    const options = this.props.router.getScreenOptions(childNavigation);
    if (!options.key) {
      options.key = route.key;
    }

    return Swiper.createAnimatedScene(
      Scene,
      childNavigation,
      index,
      position,
      options,
      () => {},
      () => {},
      true,
      -index * layout.initWidth,
      layout.initWidth,
      [!options.fullscreen && styles.cardStyle, theme.cardStyle],
    );
  }

  @bind
  renderView(transitionProps) {
    const scenes = transitionProps.scenes.map(scene =>
      this.renderScene(transitionProps, scene),
    );
    const { position } = transitionProps;
    const initWidth = this.props.index * 225;

    const translateX = position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        -initWidth - 15,
        -(2 * initWidth) - 15,
        -(3 * initWidth) - 15,
      ],
    });
    const opacity = position.interpolate({
      inputRange: [0, 0.01, 1, 2],
      outputRange: [0, 1, 1, 1],
    });

    return (
      <View style={styles.wrapper} horizontal>
        <Animated.Image
          style={[
            Swiper.getBgStyle(),
            { transform: [{ translateX }], opacity },
          ]}
          source={bg[this.props.background]}
        />
        <View style={styles.scenes}>{scenes}</View>
      </View>
    );
  }

  render() {
    return (
      <Transitioner
        configureTransition={RouterTransitioner.configureTransition}
        navigation={this.props.navigation}
        render={this.renderView}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    background: state.app.background,
  };
};

RouterTransitioner.propTypes = {
  index: number.isRequired,
  router: shape({
    getStateForAction: func.isRequired,
    getActionForPathAndParams: func.isRequired,
    getPathAndParamsForState: func.isRequired,
    getComponentForState: func.isRequired,
    getComponentForRouteName: func.isRequired,
  }).isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    state: shape({
      index: number.isRequired,
      routes: arrayOf(
        shape({
          key: string.isRequired,
          routeName: string.isRequired,
          params: object,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  background: number.isRequired,
};

export default connect(mapStateToProps)(RouterTransitioner);
