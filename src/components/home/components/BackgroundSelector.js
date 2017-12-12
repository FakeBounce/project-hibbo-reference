import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  ScrollView,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { number, func, bool } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { toggleBgSelector, selectBackground } from 'actions/appActions';

import { bgPreview } from 'styles/backgrounds';

const styles = EStyleSheet.create({
  $imgWidth: 80,
  container: {
    flex: 1,
  },
  bgWrapper: {
    position: 'absolute',
    top: 10,
    width: '100%',
    height: 100,
  },
  bg: {
    width: '$imgWidth',
    height: '$imgWidth',
    borderRadius: '$imgWidth / 2',
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
  },
});

const BackgroundSelectorHandler = Target => {
  class BackgroundSelector extends Component {
    constructor() {
      super();

      this.state = {
        opening: false,
        panY: new Animated.Value(0),
      };

      this.bgModalOpen = false;
    }

    componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, { dy }) =>
          (dy >= 10 || dy <= -10) && this.props.enableScroll,
        onMoveShouldSetPanResponderCapture: (evt, { dy }) =>
          (dy >= 10 || dy <= -10) && this.props.enableScroll,

        onPanResponderGrant: () => {
          this.state.panY.setOffset(this.bgModalOpen ? 100 : 0);
          this.state.panY.setValue(0);
          this.direction = 'none';
          this.dyCompensated = 0;
        },

        onPanResponderMove: (evt, gestureState) => {
          const { dx, dy } = gestureState;

          if (Math.abs(dy) > 10 && Math.abs(dx) < 5) {
            if (!this.state.opening && (!this.props.bgSelectorOpen && dy > 0)) {
              this.setState(state => {
                return {
                  ...state,
                  opening: true,
                };
              });
            }
          }

          if (dy > 10) {
            this.direction = 'down';
          } else if (dy < -10) {
            this.direction = 'up';
          }

          if (this.props.bgSelectorOpen) {
            this.dyCompensated = 75 + dy;
          } else {
            this.dyCompensated = dy;
          }

          this.props.handleHeaderTranslation(
            dy,
            null,
            this.state.opening,
            this.dyCompensated,
          );

          return Animated.event([null, { dy: this.state.panY }])(
            evt,
            gestureState,
          );
        },

        onPanResponderRelease: (evt, gestureState) => {
          const { dy } = gestureState;

          if (this.direction !== 'none' && Math.abs(dy) > 10) {
            this.animateBgModal(this.direction, this.direction !== 'up');
            this.props.handleHeaderTranslation(
              dy,
              this.direction,
              this.direction === 'down',
              this.dyCompensated,
            );
            this.bgModalOpen = this.direction === 'down';
          } else if (this.direction === 'none') {
            this.animateBgModal(
              this.props.bgSelectorOpen ? 'down' : 'up',
              this.props.bgSelectorOpen,
            );
            this.props.handleHeaderTranslation(
              dy,
              this.props.bgSelectorOpen ? 'down' : 'up',
              this.direction === 'down',
              this.dyCompensated,
            );
          }
        },
      });
    }

    shouldComponentUpdate(nextProps) {
      if (
        this.props.routeIndex !== nextProps.routeIndex &&
        nextProps.routeIndex !== 1
      ) {
        return false;
      }

      return true;
    }

    getCardStyles() {
      const { panY } = this.state;

      const translateY = panY.interpolate({
        inputRange: [-100, 0, 150],
        outputRange: [0, 0, 100],
        extrapolate: 'clamp',
        easing: Easing.elastic(0.8),
      });

      const transform = [
        {
          translateY,
        },
      ];

      return { transform };
    }

    animateBgModal(direction, closePanel) {
      Animated.timing(this.state.panY, {
        toValue: direction === 'up' ? -100 : 100,
        duration: 300,
      }).start(() => {
        this.state.panY.flattenOffset();

        if (closePanel !== this.props.bgSelectorOpen) {
          this.setState(
            state => {
              return {
                ...state,
                opening: closePanel,
              };
            },
            () => {
              this.props.toggleBgSelector(closePanel);
            },
          );
        }
      });
    }

    selectABackground(index) {
      this.animateBgModal('up', false);
      this.props.handleHeaderTranslation(0, 'up', false, this.dyCompensated);
      this.bgModalOpen = false;

      // eslint-disable-next-line
      requestAnimationFrame(() => {
        this.props.selectBackground(index);
      });
    }

    renderBg(index) {
      const { panY } = this.state;

      const inputOpacityRange = [-20 + -25 * index, 0, 20 + 25 * index];
      const inputTranslateRange = [-20 + -25 * index, 0, 20 + 25 * index];
      const opacity = panY.interpolate({
        inputRange: inputOpacityRange,
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
        easing: Easing.elastic(0.8),
      });
      const translateY = panY.interpolate({
        inputRange: inputTranslateRange,
        outputRange: [100, 50, index],
        extrapolate: 'clamp',
        easing: Easing.elastic(0.8),
      });

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.selectABackground(index);
          }}
          key={index}
        >
          <Animated.Image
            source={bgPreview[index]}
            style={[styles.bg, { opacity, transform: [{ translateY }] }]}
          />
        </TouchableOpacity>
      );
    }

    renderBgs() {
      const content = [];

      for (let index = 0; index < bgPreview.length; index++) {
        content.push(this.renderBg(index));
      }

      return content;
    }

    render() {
      const { opening } = this.state;

      return (
        <View style={styles.container}>
          {opening && (
            <View style={styles.bgWrapper}>
              <ScrollView
                horizontal
                bounces
                showsHorizontalScrollIndicator={false}
              >
                {this.renderBgs()}
              </ScrollView>
            </View>
          )}
          <Animated.View
            style={[styles.card, this.getCardStyles()]}
            {...this._panResponder.panHandlers}
          >
            <Target {...this.props} />
          </Animated.View>
        </View>
      );
    }
  }

  BackgroundSelector.defaultProps = {
    enableScroll: false,
  };

  BackgroundSelector.propTypes = {
    routeIndex: number.isRequired,
    toggleBgSelector: func.isRequired,
    handleHeaderTranslation: func.isRequired,
    selectBackground: func.isRequired,
    bgSelectorOpen: bool.isRequired,
    enableScroll: bool,
  };

  const mapStateToProps = state => {
    return {
      routeIndex: state.nav.routes[0].index,
      bgSelectorOpen: state.app.bgSelectorOpen,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      toggleBgSelector: value => {
        dispatch(toggleBgSelector(value));
      },
      selectBackground: value => {
        dispatch(selectBackground(value));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(BackgroundSelector);
};

export default BackgroundSelectorHandler;
