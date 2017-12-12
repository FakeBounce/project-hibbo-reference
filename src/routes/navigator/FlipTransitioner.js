import React, { Component } from 'react';
import { Animated } from 'react-native';
import {
  shape,
  arrayOf,
  number,
  string,
  func,
  object,
  instanceOf,
} from 'prop-types';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Transitioner, addNavigationHelpers } from 'react-navigation';
import { StyledContainerBasic } from 'styles/styledComponents/containers';
import theme from 'styles/appStyles';
import Swiper from './Swiper';
import { SScenes } from './styles';

const styles = EStyleSheet.create({
  $totalMargin: '2 * $size.cardMargin',
  fullscreen: {
    height: '100%',
    width: '100%',
  },
  cardStyle: {
    height: '100% - $totalMargin',
    width: '100% - $totalMargin',
    backgroundColor: 'white',
    marginTop: '$size.cardMargin',
    marginLeft: '$size.cardMargin',
  },
  animatedScenes: {
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class FlipTransitioner extends Component {
  @bind
  createFlipAnimatedScene(
    Scene,
    childNavigation,
    index,
    positionBackground,
    options,
    flipBack = false,
  ) {
    const { fullscreen } = options;
    const { handleHeaderTranslation, position, toggleHeader } = this.props;

    let YoutputRange = ['180deg', '0deg', '180deg'];
    let ZoutputRange = [40, 30];

    if (flipBack) {
      YoutputRange = ['-180deg', '0deg', '-180deg'];
      ZoutputRange = [30, 40];
    }

    const rotateY = positionBackground.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: YoutputRange,
    });

    const zIndex = positionBackground.interpolate({
      inputRange: [index, index + 1],
      outputRange: ZoutputRange,
    });

    const opacity = positionBackground.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        key={options.key}
        style={[
          {
            opacity,
            zIndex,
            transform: [{ perspective: 1000 }, { rotateY }],
          },
          styles.animatedScenes,
          flipBack && styles.back,
          fullscreen ? styles.fullscreen : [theme.cardStyle, styles.cardStyle],
        ]}
      >
        <Scene
          navigation={childNavigation}
          index={index}
          position={position}
          handleHeaderTranslation={handleHeaderTranslation}
          toggleHeader={toggleHeader}
        />
      </Animated.View>
    );
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
  renderScene({ position }, { route, index }, isFirst) {
    const { navigation, router } = this.props;
    const { dispatch } = navigation;
    const Scene = router.getComponentForRouteName(route.routeName);
    const childNavigation = addNavigationHelpers({ dispatch, state: route });
    const options = router.getScreenOptions(childNavigation);
    if (!options.key) {
      options.key = route.key;
    }

    return this.createFlipAnimatedScene(
      Scene,
      childNavigation,
      index,
      position,
      options,
      isFirst !== 0,
    );
  }

  @bind
  renderView(transitionProps) {
    const scenes = transitionProps.scenes.map((scene, index) =>
      this.renderScene(transitionProps, scene, index),
    );

    return (
      <StyledContainerBasic>
        <SScenes style={styles.scenes}>{scenes}</SScenes>
      </StyledContainerBasic>
    );
  }

  render() {
    return (
      <Transitioner
        configureTransition={() => Swiper.configureTransition(500)}
        navigation={this.props.navigation}
        render={this.renderView}
      />
    );
  }
}

FlipTransitioner.defaultProps = {
  handleHeaderTranslation: null,
  toggleHeader: null,
};

FlipTransitioner.propTypes = {
  position: instanceOf(Animated.Value).isRequired,
  handleHeaderTranslation: func,
  toggleHeader: func,
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
};

export default FlipTransitioner;
