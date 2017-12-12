import React, { Component } from 'react';
import { View, Easing, Animated, Dimensions, Platform } from 'react-native';
import {
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerAndroid,
} from 'react-native-tab-view';
import { shape, arrayOf, number, string, func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';
import { addNavigationHelpers } from 'react-navigation';
import shallowEqual from 'shallowequal';
import AndroidRipple from 'shared/components/AndroidRipple';
import Error from 'shared/Error';
import Header from 'components/header';
import theme from 'styles/appStyles';
import { bg } from 'styles/backgrounds';

EStyleSheet.build(theme);

const margin = theme.size.cardMargin;
const styles = EStyleSheet.create({
  $totalMargin: '2 * $size.cardMargin',
  $fullWidth: '3 * 100%',
  container: {
    flex: 1,
    backgroundColor: '$colors.black',
  },
  wrapper: {
    flex: 1,
    overflow: 'hidden',
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
    margin: '$size.cardMargin',
  },
  fullscreen: {
    height: '100%',
    width: '100%',
  },
  bgStyle: {
    height: '100%',
    width: '$fullWidth + $totalMargin',
    position: 'absolute',
    left: 0,
  },
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '$colors.black',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class Swiper extends Component {
  static getBgStyle(top = 0) {
    return [
      styles.bgStyle,
      {
        top,
      },
    ];
  }

  static configureTransition(duration) {
    return {
      duration: duration || 200,
      easing: Easing.elastic(0.8),
      timing: Animated.timing,
    };
  }

  static renderPager(props) {
    switch (Platform.OS) {
      case 'android':
        return <TabViewPagerAndroid {...props} />;
      default:
        return (
          <TabViewPagerPan
            {...props}
            swipeDistanceThreshold={3}
            swipeVelocityThreshold={0.1}
            configureTransition={() => Swiper.configureTransition()}
          />
        );
    }
  }

  static createAnimatedScene(
    Scene,
    childNavigation,
    index,
    position,
    options,
    handleHeaderTranslation,
    toggleHeader,
    headerEnabled = true,
    defaultPosStart = 0,
    offsetStart = 0,
    style = {},
  ) {
    const { fullscreen, defaultNavigator } = options;
    if (defaultNavigator) {
      return (
        <View key={index} style={style}>
          <Scene navigation={childNavigation} />
        </View>
      );
    }
    const offset = Dimensions.get('window').width / 2 + offsetStart;
    const defaultPos = 0 + defaultPosStart;
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [offset + defaultPos, defaultPos, -offset + defaultPos],
    });
    const rotate = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['15deg', '0deg', '-15deg'],
    });
    const opacity = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        key={options.key}
        style={[
          {
            opacity,
            transform: [{ translateX }, { rotate }],
          },
          style,
          fullscreen ? styles.fullscreen : [theme.cardStyle, styles.cardStyle],
        ]}
      >
        <Scene
          navigation={childNavigation}
          index={index}
          handleHeaderTranslation={handleHeaderTranslation}
          toggleHeader={toggleHeader}
          position={position}
          enableScroll={headerEnabled}
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    this.position = new Animated.Value(1);
    this.translateHeader = new Animated.Value(0);
    this.cardOverlay = new Animated.Value(0.5);
    this.index = 1;
    this.animationStarting = false;
    this.defaultTranslateHeader = null;

    this.state = {
      bgSelectorOpen: false,
      headerEnabled: true,
    };
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

  @bind
  onChangePosition({ value }) {
    const pos = value;
    this.position.setValue(pos);
    const val = Math.abs(pos - this.index);
    if (
      (val <= 0.96 || val >= 1.09) &&
      (val <= 1.99 || val >= 2.09) &&
      val !== 0 &&
      val !== 1 &&
      val !== 2
    ) {
      if (this.animationStarting) {
        this.animation.stop();
        this.animationStarting = false;
      }
      this.translateHeader.setValue(
        this.headerInterpolation._interpolation(pos),
      );
    } else if (!this.animationStarting) {
      this.animationStarting = true;
      // @todo: May not do that, see what the true working should be
      // this.translateHeader.setValue(-30);
      this.animation = Animated.spring(this.translateHeader, {
        tension: 30,
        friction: 3,
        velocity: 0,
        toValue: 0,
      });
      this.animation.start();
    }
  }

  @bind
  toggleHeader() {
    this.setState(state => ({
      ...state,
      headerEnabled: !this.state.headerEnabled,
    }));
  }

  @bind
  handleHeaderTranslation(
    translateY = 0,
    direction = null,
    opening,
    translateYCompensated,
  ) {
    if (!this.defaultTranslateHeader) {
      this.defaultTranslateHeader = this.translateHeader._value;
    }
    if (this.state.bgSelectorOpen !== opening) {
      if (opening) {
        this.setState(state => {
          return {
            ...state,
            bgSelectorOpen: opening,
          };
        });
      }
    }

    if (
      this.translateHeader._value <= 75 &&
      this.translateHeader._value >= -75
    ) {
      if (!this.props.bgSelectorOpen && this.translateHeader._value < 0) {
        this.cardOverlay.setValue(0);
      } else {
        this.translateHeader.setValue(
          this.direction === 'down'
            ? this.defaultTranslateHeader + translateY
            : translateY,
        );
        this.cardOverlay.setValue(translateYCompensated);
      }
    }

    if (direction) {
      this.direction = direction;
      if (direction === 'down') {
        this.defaultTranslateHeader = null;
      }

      const newValue = {
        toValue: direction === 'up' ? 0 : 75,
        duration: 300,
      };

      Animated.parallel([
        Animated.timing(this.translateHeader, newValue),
        Animated.timing(this.cardOverlay, newValue),
      ]).start(() => {
        if (this.state.bgSelectorOpen !== opening && !opening) {
          this.setState(state => {
            return {
              ...state,
              bgSelectorOpen: opening,
            };
          });
        }
      });
    }
  }

  opacityStyle() {
    const opacity = this.cardOverlay.interpolate({
      inputRange: [0, 75],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    });

    return { opacity };
  }

  @bind
  handlePageChanged(index) {
    const { navigation } = this.props;
    this.index = index;
    navigation.navigate(navigation.state.routes[this.index].routeName, {
      ...navigation.state.routes[this.index].params,
    });
  }

  @bind
  renderScene({ route, index }) {
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
      this.position,
      options,
      this.handleHeaderTranslation,
      this.toggleHeader,
      this.state.headerEnabled,
    );
  }

  render() {
    const { bgSelectorOpen } = this.state;
    const { state } = this.props.navigation;
    // @todo: change number to be ok with real background
    const translateX = this.position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-margin, -225 - margin, -500 - margin],
    });
    this.headerInterpolation = this.position.interpolate({
      inputRange: [this.index - 1, this.index, this.index + 2],
      outputRange: [-30, 0, -30],
      easing: Easing.elastic(0.8),
    });
    const props = {
      lazy: false,
      initialLayout: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      animationEnabled: true,
      swipeEnabled:
        !state.routes[state.index].index &&
        !this.props.bgSelectorOpen &&
        this.state.headerEnabled,
      renderScene: this.renderScene,
      onIndexChange: this.handlePageChanged,
      navigationState: state,
      style: styles.scenes,
      onPositionChange: this.onChangePosition,
      renderPager: Swiper.renderPager,
    };

    return (
      <View style={styles.container}>
        <View style={[styles.wrapper, theme.cardStyle]} horizontal>
          <Animated.Image
            style={[Swiper.getBgStyle(), { transform: [{ translateX }] }]}
            source={bg[this.props.background]}
          />
          {bgSelectorOpen && (
            <Animated.View style={[styles.overlay, this.opacityStyle()]} />
          )}
          <TabViewAnimated {...props} />
          {(state.routes[state.index].index === 0 ||
            !state.routes[state.index].index) &&
            this.state.headerEnabled && (
              <Header
                navigation={this.props.navigation}
                translateHeader={this.translateHeader}
              />
            )}
          <Error position="top" navigation={this.props.navigation} />
          {Platform.OS === 'android' && <AndroidRipple />}
        </View>
      </View>
    );
  }
}

Swiper.propTypes = {
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
  bgSelectorOpen: bool.isRequired,
  background: number.isRequired,
};

const mapStateToProps = state => {
  return {
    bgSelectorOpen: state.app.bgSelectorOpen,
    background: state.app.background,
  };
};

export default connect(mapStateToProps)(Swiper);
